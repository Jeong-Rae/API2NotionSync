const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

const docsFile = path.join(__dirname, "../temp", "docs.md");
const summaryFile = path.join(__dirname, "../temp", "summary.md");
const schemaFile = path.join(__dirname, "../temp", "schema.md");

async function extractSchema() {
    console.log("== DO EXTRACT SCHEMA ==");

    try {
        const data = await readFile(docsFile, "utf8");
        const sections = data.split("# Schemas");

        // summary.md 저장
        await writeFile(summaryFile, sections[0], "utf8");
        console.log("저장 성공 : summary.md");

        // schema.md 저장
        if (sections.length > 1) {
            await writeFile(schemaFile, "# Schemas\n" + sections[1], "utf8");
            console.log("저장 성공 : schema.md");
        }

        console.log("== FIN EXTRACT SCHEMA ==");

        // 사용한 docs.md 삭제
        await unlink(docsFile);
    } catch (err) {
        console.error("파일 처리 중 에러 발생 ->", err);
    }
}

module.exports = extractSchema;
