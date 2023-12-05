const axios = require("axios");
const fs = require("fs");
const path = require("path");
const util = require("util");

const appendFile = util.promisify(fs.appendFile);

const token = "secret_xm5CmdMZQfkW35nk7NA7sy78shS4XewVcLjc6kfmCfG"; // 노션 API 키
const parentPageId = "a79064c764414e4b976be7681ca7af1b"; // 부모 페이지 ID

const tempDirectory = path.join(__dirname, "test");
const errorLogFile = path.join(__dirname, "src", "trace.error");

/* 에러 log */
async function logError(error) {
    const timestamp = new Date().toISOString();
    let errorMessage = `${timestamp} - ${error.message}`;

    if (error.stack) {
        errorMessage += `\nStack Trace:\n${error.stack}`;
    }

    if (error.isAxiosError) {
        errorMessage += `\nAxios Error: ${error.message}`;
        /* config는 trace가 과도한 문제 있음 고민 필요
        if (error.config) {
            errorMessage += `\nConfig: ${JSON.stringify(error.config)}`;
        }
        */
        if (error.code) {
            errorMessage += `\nCode: ${error.code}`;
        }
        if (error.response) {
            errorMessage += `\nResponse Status: ${error.response.status}`;
            errorMessage += `\nResponse Status Text: ${error.response.statusText}`;
        }
    }

    errorMessage += "\n\n";
    await appendFile(errorLogFile, errorMessage);
}

/*  태그 목록 가져오기 */
function getTags(dir) {
    const tags = new Set();
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        if (path.extname(file) === ".json") {
            const tag = file.split("-")[0];
            if (tag !== "") {
                tags.add(tag);
            }
        }
    });
    return Array.from(tags);
}

/* Tag로 시작하는 모든 APi문서를 rootPage에 post */
async function postApiDocs(rootPageId, tag) {
    // 'temp'에서 특정 태그로 시작하는 JSON 파일 파일명 가져오기
    const jsonFiles = fs
        .readdirSync(tempDirectory)
        .filter(
            (file) => file.startsWith(tag) && path.extname(file) === ".json"
        )
        .map((file) => path.join(tempDirectory, file));

    // 각 JSON 파일의 내용을 루트 페이지에 추가
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
            console.log(`추가 성공 : ${path.basename(file)}`);
        } catch (error) {
            console.error(`추가 실패 : ${path.basename(file)}`);
            logError(error);
        }
    }
}

/* 루트 페이지를 post */
async function postRootPage(tag) {
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

        // 생성된 루트 페이지 Id 저장해서 내용 추가할 경로로 지정
        rootPageId = rootResponse.data.id;
        console.log(`생성 성공 : '${tag}' Root`);
    } catch (error) {
        console.error(`생성 실패 : '${tag}'`);
        logError(error);
        return;
    }

    postApiDocs(rootPageId, tag);
}

/* 모든 태그 post */
async function postTagOnPage() {
    console.log("== DO ALL TAGS DOCS POSTING ==");
    const tags = getTags(tempDirectory);
    for (const tag of tags) {
        await postRootPage(tag);
    }
    console.log("== FIN POST ALL TAGS DOCS POSTING ==");
}

module.exports = postTagOnPage;
