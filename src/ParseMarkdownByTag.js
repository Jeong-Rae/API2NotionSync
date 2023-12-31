const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

const docsFile = path.join(__dirname, "../temp", "summary.md");

const ANSIEscapeCode = {
    cover: "\x1b[A",
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    white: "\x1b[37m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
};

const progress = {
    gauge : 0,
    full : 0,
}

/* 마크다운 분할 */
function splitMarkdown(markdown) {
    const splitSections = [];
    const lines = markdown.split("\n");
    let currentSection = "";

    lines.forEach((line) => {
        if (line.startsWith("<h1") || line.startsWith("## ")) {
            if (currentSection !== "") {
                splitSections.push(currentSection);
                currentSection = "";
            }
        }
        currentSection += line + "\n";
    });

    /* 마지막 섹션 처리 */
    if (currentSection !== "") {
        splitSections.push(currentSection);
    }

    return splitSections;
}

/* 태그 컨텐츠 추출 */
function extractTitle(line) {
    const matches = line.match(/<h1 id=".*?">(.*?)<\/h1>/);
    return matches ? matches[1] : null;
}

/* 파일명 생성 */
function generateFileName(currentTitle, sectionCount, isHeader) {
    if (isHeader) {
        return `${"Header".replace(/\s+/g, "-")}-${sectionCount}.md`;
    }
    return `${currentTitle.replace(/\s+/g, "-")}-${sectionCount}.md`;
}

/* 마크다운 파일 저장 */
async function parseMarkdownByTag() {
    console.log(`\n${ANSIEscapeCode.blue}== START PARSE MARKDOWN BY TAG ==${ANSIEscapeCode.reset}`);
    console.log();
    try {
        const data = await readFile(docsFile, "utf8");
        const sections = splitMarkdown(data);
        let currentTitle = "";
        let sectionCount = 0;
        let isHeader = 2;
        const writeOperations = [];

        progress.full = sections.length;

        sections.forEach((section) => {
            const lines = section.split("\n");
            const titleLine = lines.find((line) => line.startsWith("<h1"));

            if (titleLine) {
                const newTitle = extractTitle(titleLine);

                if (newTitle) {
                    currentTitle = newTitle;
                    sectionCount = 1;
                } else {
                    sectionCount++;
                }
            } else {
                sectionCount++;
            }

            const fileName = generateFileName(currentTitle, sectionCount, isHeader);
            if (isHeader){
                isHeader--;
            }
            const filePath = path.join(__dirname, "../temp", fileName);

            // 파일 쓰기 작업을 배열에 추가
            writeOperations.push(
                writeFile(filePath, section, "utf8")
                    .then(() => {
                        progress.gauge += 1;
                        process.stdout.write(`${ANSIEscapeCode.cover}`);
                        console.log(`진행도 [ ${Math.round(progress.gauge / progress.full * 100)} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(Math.floor(progress.gauge / progress.full * 10))}${ANSIEscapeCode.reset}`)
                    })
                    .catch((err) => {
                        fs.appendFile(path.join(__dirname, "../log/trace.error"), `저장 실패 -> ${err}`);
                    })
            );
        });

        // 모든 파일이 저장될 때까지 기다리기
        await Promise.all(writeOperations);
        console.log(`${ANSIEscapeCode.blue}== FIN PARSE MARKDOWN BY TAG ==${ANSIEscapeCode.reset}`);

        await unlink(docsFile);
    } catch (err) {
        console.error("파일 읽기 중 에러 발생 ->", err);
    }
}

module.exports = parseMarkdownByTag;
