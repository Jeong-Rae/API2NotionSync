const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

const tempDirectory = "./test";

async function removeInnerRef() {
    console.log("== DO REMOVE INNER REF ==");
    try {
        const files = await readdir(tempDirectory);

        const writeOperations = files.map(async (file) => {
            if (path.extname(file) === ".md") {
                const filePath = path.join(tempDirectory, file);
                const data = await readFile(filePath, "utf8");

                // 내부 참조 링크 제거
                const updatedMarkdown = data.replace(
                    /\[([^\]]+)\]\(#.+?\)/g,
                    "$1"
                );

                // 결과를 같은 이름의 파일로 저장
                const newFilePath = path.join(tempDirectory, `${file}`);
                await writeFile(newFilePath, updatedMarkdown, "utf8");
                console.log(`참조 제거 : ${file}`);
            }
        });

        // 모든 파일 저장 대기
        await Promise.all(writeOperations);
        console.log("== FIN REMOVE INNER REF ==");
    } catch (err) {
        console.error("오류 발생:", err);
    }
}

removeInnerRef();
