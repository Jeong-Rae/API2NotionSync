const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);

const docsFile = path.join(__dirname, "../temp", "docs.md");
const summaryFile = path.join(__dirname, "../temp", "summary.md");
const schemaFile = path.join(__dirname, "../temp", "schema.md");

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

async function extractSchema() {
    console.log(`\n${ANSIEscapeCode.blue}== START EXTRACT SCHEMA ==${ANSIEscapeCode.reset}`);
    
    try {
        console.log();
        const data = await readFile(docsFile, "utf8");
        const sections = data.split("# Schemas");

        // summary.md 저장
        await writeFile(summaryFile, sections[0], "utf8");
        progress.gauge += 5;
        process.stdout.write(`${ANSIEscapeCode.cover}`);
        console.log(`${ANSIEscapeCode.reset}진행도 [ ${progress.gauge * 10} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(progress.gauge)}${ANSIEscapeCode.reset}`);
        
        // schema.md 저장
        if (sections.length > 1) {
            await writeFile(schemaFile, "# Schemas\n" + sections[1], "utf8");
            progress.gauge += 5;
            process.stdout.write(`${ANSIEscapeCode.cover}`);
            console.log(`${ANSIEscapeCode.reset}진행도 [ ${progress.gauge * 10} % ] ${ANSIEscapeCode.green}${"▤▤".repeat(progress.gauge)}${ANSIEscapeCode.reset}`);
        }

        console.log(`${ANSIEscapeCode.blue}== END EXTRACT SCHEMA ==${ANSIEscapeCode.reset}`);

        // 사용한 docs.md 삭제
        await unlink(docsFile);
    } catch (err) {
        console.error("err occurred -> ", err);
    }
}

module.exports = extractSchema;
