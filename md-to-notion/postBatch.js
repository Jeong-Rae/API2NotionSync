const axios = require("axios");
const fs = require("fs");

// 노션 API 키
const token = "secret_xm5CmdMZQfkW35nk7NA7sy78shS4XewVcLjc6kfmCfG";

const tag = "Board";

// JSON 파일 목록
const jsonFiles = ["vote1.json", "vote2.json", "vote3.json"];

// 루트 페이지 생성 및 각 JSON 파일의 내용 추가
async function createAndPopulateRootPage() {
    // 루트 페이지 생성
    const rootPageData = {
        parent: { page_id: "4c5988a2005947c49632689886f68598" },
        properties: {
            이름: {
                title: [
                    {
                        text: {
                            content: "Vote",
                        },
                    },
                ],
            },
        },
    };

    let rootPageId;

    try {
        const response = await axios.post(
            "https://api.notion.com/v1/pages",
            rootPageData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Notion-Version": "2022-06-28",
                    "Content-Type": "application/json",
                },
            }
        );
        rootPageId = response.data.id;
        console.log("루트 페이지 생성 성공");
    } catch (error) {
        console.error("루트 페이지 생성 실패:", error);
        return;
    }

    // 각 JSON 파일의 내용을 루트 페이지에 추가
    for (const file of jsonFiles) {
        const fileData = JSON.parse(fs.readFileSync(`./${file}`, "utf-8"));
        try {
            const response = await axios.patch(
                `https://api.notion.com/v1/blocks/${rootPageId}/children`,
                {
                    children: fileData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Notion-Version": "2022-06-28",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(`${file} 추가 성공`);
            // 응답에서 블록 ID 추출 및 출력
            const blockIds = response.data.results.map((block) => block.id);
            console.log(`${file} 추가 성공. 블록 ID:`, blockIds);
        } catch (error) {
            console.error(`${file} 추가 실패:`, error);
        }
    }
}

createAndPopulateRootPage();
