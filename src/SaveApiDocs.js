const axios = require("axios");
const fs = require("fs");
const util = require("util");
const path = require("path");

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const exists = util.promisify(fs.exists);
const copyFile = util.promisify(fs.copyFile);

const filePath = path.join(__dirname, "../resource", "api-docs.yaml");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function saveApiDocs(SERVER_HOST, pathInput) {
    if (pathInput !== "") {
        try {
            await copyFile(pathInput, filePath);
        } catch (err) {
            console.error("error occurred -> ", err);
        }
        return;
    }
    const url = SERVER_HOST + "/v3/api-docs.yaml";

    try {
        const dirPath = path.dirname(filePath);

        console.log("== DO SAVE API-DOCS.YAML ==");
        // resource 디렉토리 생성
        if (!(await exists(dirPath))) {
            await mkdir(dirPath, { recursive: true });
        }

        //GET 요청 10초간격 최대 10번 실행
        let response;
        for (let t = 0; t < 10; t++) {
            try {
                response = await axios.get(url, { responseType: "arraybuffer" });
                break;
            } catch (err) {
                console.error(`저장 대기 ${t + 1}회 ->`, err.message);
                if (t < 9) await delay(10000);
            }
        }

        if (!response) {
            throw new Error("save docs fail");
        }

        // 파일 저장
        await writeFile(filePath, response.data, "utf8");
        console.log(`저장 완료: ${filePath}`);
    } catch (err) {
        console.error("err occurred -> ", err);
    }

    if (!(await exists(path.join(__dirname, "../temp")))) {
        await mkdir(path.join(__dirname, "../temp"), { recursive: true });
    }
    console.log("== END SAVE API-DOCS.YAML ==");
}

module.exports = saveApiDocs;
