const { execSync } = require("child_process");
const path = require("path");

const yamlFile = path.join(__dirname, "../resource", "api-docs.yaml");
const markdownFile = path.join(__dirname, "../temp", "docs.md");
const command = [
    "node",
    path.join(__dirname, "../node_modules/widdershins/widdershins.js"),
    yamlFile,
    "-o",
    markdownFile,
    "--summary true",
    "--omitHeader true",
    "--code true",
    "--resolve true",
].join(" ");

function convertYamlToMd() {
    try {
        console.log("== DO CONVERT API-DOCS.YAML TO DOCS.MD ==");

        execSync(command);

        console.log("== FIN CONVERT API-DOCS.YAML TO DOCS.MD ==");
    } catch (error) {
        console.error(`실행 중 오류 발생 -> ${error}`);
    }
}

module.exports = convertYamlToMd;
