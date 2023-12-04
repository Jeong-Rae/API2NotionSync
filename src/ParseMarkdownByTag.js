const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

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

/* 마크다운 파일 저장 */
async function parseMarkdownByTag() {
    console.log("== DO PARSE MARKDOWN BY TAG ==");
    try {
        const data = await readFile("./test/docs.md", "utf8");
        const sections = splitMarkdown(data);
        let currentTitle = "";
        let sectionCount = 0;
        const writeOperations = [];

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

            const fileName = `./test/${currentTitle.replace(
                /\s+/g,
                "-"
            )}-${sectionCount}.md`;
            const filePath = path.join(process.cwd(), fileName);

            // 파일 쓰기 작업을 배열에 추가
            writeOperations.push(
                writeFile(filePath, section, "utf8")
                    .then(() => {
                        console.log(`저장 성공 : ${fileName}`);
                    })
                    .catch((err) => {
                        console.error(`저장 실패 : ${fileName} ? `, err);
                    })
            );
        });

        // 모든 파일이 저장될 때까지 기다리기
        await Promise.all(writeOperations);
        console.log("== FIN PARSE MARKDOWN BY TAG ==");

        await unlink("./test/docs.md");
    } catch (err) {
        console.error("파일 읽기 중 에러 발생:", err);
    }
}

parseMarkdownByTag();
