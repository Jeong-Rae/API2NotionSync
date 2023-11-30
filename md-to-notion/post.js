const axios = require("axios");
const fs = require("fs");

// 노션 API 키
const token = "secret_xm5CmdMZQfkW35nk7NA7sy78shS4XewVcLjc6kfmCfG";

// 노션 데이터베이스 ID 또는 페이지 ID
const databaseId = "4c5988a2005947c49632689886f68598";

// JSON 파일 읽기
const postData = JSON.parse(fs.readFileSync("./base.json", "utf-8"));

// 노션 API에 요청 보내기
axios
    .post("https://api.notion.com/v1/pages", postData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Notion-Version": "2022-06-28", // API 버전 지정
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        console.log("페이지 생성 성공:", response.data);
    })
    .catch((error) => {
        console.error("에러 발생:", error);
    });
