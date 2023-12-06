const axios = require("axios");
const fs = require("fs");
const util = require("util");
const path = require("path");

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const exists = util.promisify(fs.exists);

const host = "https://api.interfacesejong.xyz/";
const url = host + "v3/api-docs.yaml";
const filePath = path.join(__dirname, "../resource", "api-docs.yaml");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function saveApiDocs() {
    try {
        const dirPath = path.dirname(filePath);

        console.log("== DO SAVE API-DOCS.YAML ==");
        // resource 디렉토리 생성
        if (!(await exists(dirPath))) {
            await mkdir(dirPath, { recursive: true });
        }

        //GET 요청 10초간격 최대 10번 실행
        let response;
        for (let attempt = 0; attempt < 10; attempt++) {
            try {
                response = await axios.get(url, { responseType: "arraybuffer" });
                break;
            } catch (error) {
                console.error(`저장 실패 ${attempt + 1}번) -> : ${error.message}`);
                if (attempt < 9) await delay(10000);
            }
        }

        if (!response) {
            throw new Error("GET 10번 실패");
        }

        // 파일 저장
        await writeFile(filePath, response.data, "utf8");
        console.log(`저장 완료: ${filePath}`);
    } catch (error) {
        console.error(`저장 실패 -> : ${error.message}`);

        
    }

    if (!(await exists(path.join(__dirname, "../temp")))) {
        await mkdir(path.join(__dirname, "../temp"), { recursive: true });
    }
    console.log("== FIN SAVE API-DOCS.YAML ==");
}

module.exports = saveApiDocs;
