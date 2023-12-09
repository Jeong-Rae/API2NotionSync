const fs = require("fs");
const path = require("path");
const util = require("util");
const { markdownToBlocks, markdownToRichText } = require("@tryfabric/martian");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

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
    del: 0,
    full: 0,
};

async function mdToNotionForDir() {
    try {
        const files = await readdir(tempPath);
        progress.full = files.filter(
            (file) => path.extname(file) === ".md" && file !== "schema.md"
        ).length;
        progress.gauge = 0;
        progress.del = 0;

        const operations = files.map(async (file) => {
            if (path.extname(file) === ".md" && file !== "schema.md") {
                const filePath = path.join(tempPath, file);
                const markdown = await readFile(filePath, "utf8");

                // Notion 블록 객체로 변경
                const notionBlocks = markdownToBlocks(markdown);

                // JSON 파일 저장
                const jsonFileName = path.basename(file, ".md") + ".json";
                const jsonFilePath = path.join(tempPath, jsonFileName);

                await writeFile(
                    jsonFilePath,
                    JSON.stringify(notionBlocks, null, 2),
                    "utf8"
                );
                progress.gauge += 1;
                
                // 변환된 Markdown 파일 삭제
                await unlink(filePath);
                progress.del += 1;
                process.stdout.write(`${ANSIEscapeCode.cover}${ANSIEscapeCode.cover}`);
                console.log(`변환 진행도 [ ${Math.round(progress.gauge / progress.full * 100)} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(Math.floor(progress.gauge / progress.full * 10))}${ANSIEscapeCode.reset}`);
                console.log(`제거 진행도 [ ${Math.round(progress.del / progress.full * 100)} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(Math.floor(progress.del / progress.full * 10))}${ANSIEscapeCode.reset}`);
            }
        });

        // 저장 완료 대기
        await Promise.all(operations);
        console.log(`${ANSIEscapeCode.blue}== END CONVERT DIR ==${ANSIEscapeCode.reset}`);
    } catch (err) {
        fs.appendFile(path.join(__dirname, "../log/trace.error"), `err occurred -> -> ${err}`);
    }
}

module.exports = mdToNotionForDir;
