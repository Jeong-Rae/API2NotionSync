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
        console.log("== START CONVERT API-DOCS.YAML TO DOCS.MD ==");

        execSync(command);

        console.log("== END CONVERT API-DOCS.YAML TO DOCS.MD ==");
    } catch (err) {
        console.error("err occurred -> ", err);
    }
}

module.exports = convertYamlToMd;
