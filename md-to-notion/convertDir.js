const fs = require("fs");
const path = require("path");
const { markdownToBlocks } = require("@tryfabric/martian");

const tempDirectory = "../test"; // 'temp' 디렉토리 경로

// 'temp' 디렉토리의 파일 목록 읽기
fs.readdir(tempDirectory, (err, files) => {
    if (err) {
        console.error("디렉토리 읽기 중 오류 발생:", err);
        return;
    }

    files.forEach((file) => {
        // 파일 확장자가 .md인 경우에만 처리
        if (path.extname(file) === ".md") {
            const filePath = path.join(tempDirectory, file);
            const markdown = fs.readFileSync(filePath, "utf8");

            const notionBlocks = markdownToBlocks(markdown);

            // 변환된 JSON을 새로운 파일로 저장
            const jsonFileName = path.basename(file, ".md") + ".json";
            const jsonFilePath = path.join(tempDirectory, jsonFileName);

            fs.writeFileSync(
                jsonFilePath,
                JSON.stringify(notionBlocks, null, 2),
                "utf8"
            );
            console.log(
                `${file} 파일이 ${jsonFileName}로 변환되어 저장되었습니다.`
            );
        }
    });
});
