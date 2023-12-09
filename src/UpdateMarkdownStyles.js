const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const tempPath = path.join(__dirname, "../temp");

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
    gauge: 0,
    full: 0,
};

/* 태그 컨텐츠 추출 */
function extractTitle(line) {
    const matches = line.match(/<h1 id=".*?">(.*?)<\/h1>/);
    return matches ? matches[1] : null;
}

/* 내부 참조 제거 */
async function removeInnerRef() {
    console.log(`\n${ANSIEscapeCode.blue}== START REMOVE INNER REF ==${ANSIEscapeCode.reset}`);
    console.log();
    try {
        const files = await readdir(tempPath);
        progress.gauge = 0;
        progress.full = files.length;

        const writeOperations = files.map(async (file) => {
            if (path.extname(file) === ".md") {
                const filePath = path.join(tempPath, file);
                const data = await readFile(filePath, "utf8");

                // 내부 참조 링크 제거
                const updatedMarkdown = data.replace(
                    /\[([^\]]+)\]\(#.+?\)/g,
                    "$1"
                );

                // 결과를 같은 이름의 파일로 저장
                const newFilePath = path.join(tempPath, `${file}`);
                await writeFile(newFilePath, updatedMarkdown, "utf8");
                progress.gauge += 1;
                process.stdout.write(`${ANSIEscapeCode.cover}`);
                console.log(`제거 진행도 [ ${Math.round(progress.gauge / progress.full * 100)} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(Math.floor(progress.gauge / progress.full * 10))}${ANSIEscapeCode.reset}`)
            }
        });

        // 모든 파일 저장 대기
        await Promise.all(writeOperations);
        console.log(`${ANSIEscapeCode.blue}== END REMOVE INNER REF ==${ANSIEscapeCode.reset}`);
    } catch (err) {
        fs.appendFile(path.join(__dirname, "../log/trace.error"), `err occurred -> -> ${err}`);
    }
}

/* 헤딩 스타일 변경 */
async function changeHeading() {
    console.log(`\n${ANSIEscapeCode.blue}== START CHANGE HEADING ==${ANSIEscapeCode.reset}`);
    console.log();
    try {
        const files = await readdir(tempPath);
        progress.gauge = 0;
        progress.full = files.filter(file => file.match(/^.+?-1\.md$/)).length;

        const writeOperations = files.map(async (file) => {
            // tag-1.md 파일만
            if (path.extname(file) === ".md" && file.match(/^.+?-1\.md$/)) {
                const filePath = path.join(tempPath, file);
                const data = await readFile(filePath, "utf8");

                // Markup 태그를 Markdown 스타일의 헤딩으로 변환
                const updatedMarkdown = data.replace(
                    /<h1 id=".*?">(.*?)<\/h1>/g,
                    (match, p1) => {
                        const title = extractTitle(match);
                        return title ? `# ${title}` : "";
                    }
                );

                const newFilePath = path.join(tempPath, file);
                await writeFile(newFilePath, updatedMarkdown, "utf8");
                progress.gauge += 1;
                process.stdout.write(`${ANSIEscapeCode.cover}`);
                console.log(`변환 진행도 [ ${Math.round(progress.gauge / progress.full * 100)} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(Math.floor(progress.gauge / progress.full * 10))}${ANSIEscapeCode.reset}`)
            }
        });

        // 모든 파일 저장 대기
        await Promise.all(writeOperations);
        console.log(`${ANSIEscapeCode.blue}== END CHANGE HEADING ==${ANSIEscapeCode.reset}`);
    } catch (err) {
        fs.appendFile(path.join(__dirname, "../log/trace.error"), `err occurred -> -> ${err}`);
    }
}

async function updateMarkdownStyles() {
    await removeInnerRef();
    await changeHeading();
}

module.exports = updateMarkdownStyles;
