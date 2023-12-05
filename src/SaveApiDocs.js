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

async function saveApiDocs() {
    try {
        const dirPath = path.dirname(filePath);

        console.log("== DO SAVE API-DOCS.YAML ==");
        // resource 디렉토리 생성
        if (!(await exists(dirPath))) {
            await mkdir(dirPath, { recursive: true });
        }

        const response = await axios.get(url, { responseType: "arraybuffer" });

        // 파일 저장
        await writeFile(filePath, response.data, "utf8");
        console.log(`저장 완료: ${filePath}`);
    } catch (error) {
        console.error(`저장 실패 -> : ${error.message}`);
    }

    if (!(await exists("test"))) {
        await mkdir("test", { recursive: true });
    }
    console.log("== FIN SAVE API-DOCS.YAML ==");
}

module.exports = saveApiDocs;
