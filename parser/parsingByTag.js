const fs = require("fs");
const path = require("path");

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

    if (currentSection !== "") {
        splitSections.push(currentSection);
    }

    return splitSections;
}

function extractTitle(line) {
    const matches = line.match(/<h1 id=".*?">(.*?)<\/h1>/);
    return matches ? matches[1] : null;
}

fs.readFile("../test/docs.md", "utf8", (err, data) => {
    if (err) {
        console.error("파일 읽기 중 에러 발생:", err);
        return;
    }

    const sections = splitMarkdown(data);
    let currentTitle = "";
    let sectionCount = 0;

    sections.forEach((section) => {
        const lines = section.split("\n");
        const titleLine = lines.find((line) => line.startsWith("<h1"));

        // titleLine이 undefined가 아닐 경우에만 extractTitle 함수를 호출
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

        const fileName = `${currentTitle.replace(
            /\s+/g,
            "-"
        )}-${sectionCount}.md`;
        const filePath = path.join(process.cwd(), fileName);

        fs.writeFile(filePath, section, "utf8", (err) => {
            if (err) {
                console.error(`${fileName} 저장 중 에러 발생:`, err);
            } else {
                console.log(`${fileName} 저장 완료`);
            }
        });
    });
});
