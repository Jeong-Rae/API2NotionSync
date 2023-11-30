const fs = require("fs");
const path = require("path");

const tempDirectory = "../test"; // 'temp' 디렉토리 경로

fs.readdir(tempDirectory, (err, files) => {
    if (err) {
        console.error("디렉토리 읽기 중 오류 발생:", err);
        return;
    }

    files.forEach((file) => {
        // 파일 확장자가 .md인 경우에만 처리
        if (path.extname(file) === ".md") {
            const filePath = path.join(tempDirectory, file);

            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    console.error("파일 읽기 중 오류 발생:", err);
                    return;
                }

                // 내부 참조 링크 제거 ([text](#anchor))
                const updatedMarkdown = data.replace(
                    /\[([^\]]+)\]\(#.+?\)/g,
                    "$1"
                );

                // 결과를 같은 이름의 새 파일로 저장
                const newFilePath = path.join(tempDirectory, `${file}`);

                fs.writeFile(newFilePath, updatedMarkdown, "utf8", (err) => {
                    if (err) {
                        console.error("파일 저장 중 오류 발생:", err);
                        return;
                    }
                    console.log(
                        `${file} 내부 참조가 제거되어 ${newFilePath}로 저장되었습니다.`
                    );
                });
            });
        }
    });
});
