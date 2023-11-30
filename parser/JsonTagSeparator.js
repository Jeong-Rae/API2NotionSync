const fs = require("fs");

function readJsonFile(filePath) {
    try {
        const rawData = fs.readFileSync(filePath);
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return null;
    }
}

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing JSON file:", error);
    }
}

function separateJsonByTags(originalJson) {
    const separatedData = {};

    for (const path in originalJson.paths) {
        const methods = originalJson.paths[path];
        for (const method in methods) {
            const endpoint = methods[method];
            if (endpoint.tags && endpoint.tags.length > 0) {
                endpoint.tags.forEach((tag) => {
                    if (!separatedData[tag]) {
                        separatedData[tag] = { paths: {} };
                    }
                    if (!separatedData[tag].paths[path]) {
                        separatedData[tag].paths[path] = {};
                    }
                    separatedData[tag].paths[path][method] = endpoint;
                });
            }
        }
    }

    return separatedData;
}

function main() {
    const originalJson = readJsonFile("./path.json");
    if (!originalJson) return;

    const separatedData = separateJsonByTags(originalJson);

    for (const tag in separatedData) {
        writeJsonFile(`${tag}.json`, separatedData[tag]);
    }
}

main();
