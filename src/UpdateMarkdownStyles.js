const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const tempPath = path.join(__dirname, "../temp");

/* 태그 컨텐츠 추출 */
function extractTitle(line) {
    const matches = line.match(/<h1 id=".*?">(.*?)<\/h1>/);
    return matches ? matches[1] : null;
}

/* 내부 참조 제거 */
async function removeInnerRef() {
    console.log("== START REMOVE INNER REF ==");
    try {
        const files = await readdir(tempPath);

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
                console.log(`참조 제거 : ${file}`);
            }
        });

        // 모든 파일 저장 대기
        await Promise.all(writeOperations);
        console.log("== END REMOVE INNER REF ==");
    } catch (err) {
        console.error("err occurred -> ", err);
    }
}

/* 헤딩 스타일 변경 */
async function changeHeading() {
    console.log("== START CHANGE HEADING ==");
    try {
        const files = await readdir(tempPath);

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
                console.log(`헤딩 변경 : ${file}`);
            }
        });

        // 모든 파일 저장 대기
        await Promise.all(writeOperations);
        console.log("== END CHANGE HEADING ==");
    } catch (err) {
        console.error("err occurred -> ", err);
    }
}

async function updateMarkdownStyles() {
    await removeInnerRef();
    await changeHeading();
}

module.exports = updateMarkdownStyles;
