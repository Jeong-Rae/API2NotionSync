const axios = require("axios");
const fs = require("fs");
const path = require("path");

const token = "secret_xm5CmdMZQfkW35nk7NA7sy78shS4XewVcLjc6kfmCfG"; // 노션 API 키
const parentPageId = "a79064c764414e4b976be7681ca7af1b"; // 부모 페이지 ID
const tempDirectory = "../test"; // 'temp' 디렉토리 경로
const tag = process.argv[2]; // 태그

async function createAndPopulateRootPage() {
    // 루트 페이지 생성
    const rootPageData = {
        parent: { page_id: parentPageId },
        properties: {
            title: {
                title: [
                    {
                        text: {
                            content: tag, // 루트 페이지 제목
                        },
                    },
                ],
            },
        },
    };

    let rootPageId;

    try {
        const rootResponse = await axios.post(
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
        rootPageId = rootResponse.data.id;
        console.log(`루트 페이지 '${tag}' 생성 성공`);
    } catch (error) {
        console.error(`루트 페이지 '${tag}' 생성 실패:`, error);
        return;
    }

    // 'temp' 디렉토리에서 특정 태그로 시작하는 JSON 파일 목록 가져오기
    const jsonFiles = fs
        .readdirSync(tempDirectory)
        .filter(
            (file) => file.startsWith(tag) && path.extname(file) === ".json"
        )
        .map((file) => path.join(tempDirectory, file));

    // 각 JSON 파일의 내용을 루트 페이지 아래에 추가
    for (const file of jsonFiles) {
        const fileData = JSON.parse(fs.readFileSync(file, "utf-8"));

        try {
            const response = await axios.patch(
                `https://api.notion.com/v1/blocks/${rootPageId}/children`,
                { children: fileData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Notion-Version": "2022-06-28",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(`${path.basename(file)} 페이지 추가 성공`);
        } catch (error) {
            console.error(`${path.basename(file)} 페이지 추가 실패:`, error);
        }
    }
}

createAndPopulateRootPage();
