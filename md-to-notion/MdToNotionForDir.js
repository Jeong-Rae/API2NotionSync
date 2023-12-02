const fs = require("fs");
const path = require("path");
const util = require("util");
const { markdownToBlocks } = require("@tryfabric/martian");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

const tempDirectory = "./test";

async function mdToNotionForDir() {
    try {
        const files = await readdir(tempDirectory);

        const operations = files.map(async (file) => {
            if (path.extname(file) === ".md") {
                const filePath = path.join(tempDirectory, file);
                const markdown = await readFile(filePath, "utf8");

                // Notion 블록 객체로 변경
                const notionBlocks = markdownToBlocks(markdown);

                // JSON 파일 저장
                const jsonFileName = path.basename(file, ".md") + ".json";
                const jsonFilePath = path.join(tempDirectory, jsonFileName);

                await writeFile(
                    jsonFilePath,
                    JSON.stringify(notionBlocks, null, 2),
                    "utf8"
                );
                console.log(`변환 완료 : ${file} -> ${jsonFileName}`);

                // 변환된 Markdown 파일 삭제
                await unlink(filePath);
                console.log(`삭제 완료 : ${file}`);
            }
        });

        // 저장 완료 대기
        await Promise.all(operations);
        console.log("== FIN CONVERT DIR ==");
    } catch (err) {
        console.error("오류 발생:", err);
    }
}

mdToNotionForDir();
