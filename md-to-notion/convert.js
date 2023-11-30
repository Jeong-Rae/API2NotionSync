const fs = require("fs");
const { markdownToBlocks } = require("@tryfabric/martian");

// 'docs.md' 파일에서 마크다운 읽기
const markdown = fs.readFileSync("../test.md", "utf8");

// 마크다운을 노션 블록 객체로 변환
const notionBlocks = markdownToBlocks(markdown);

// 결과를 'notion-docs.json' 파일로 저장
fs.writeFileSync(
    "notion-docs.json",
    JSON.stringify(notionBlocks, null, 2),
    "utf8"
);

console.log(
    '변환 완료: 마크다운이 노션 객체로 변환되어 "notion-docs.json" 파일에 저장되었습니다.'
);
