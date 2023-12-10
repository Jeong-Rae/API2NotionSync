const { execSync } = require("child_process");
const path = require("path");

const yamlFile = path.join(__dirname, "../resource", "api-docs.yaml");
const markdownFile = path.join(__dirname, "../temp", "docs.md");

const widdershinsPath = require.resolve("widdershins");

const command = [
    "node",
    path.join(path.dirname(path.dirname(widdershinsPath)), "widdershins.js"),
    yamlFile,
    "-o",
    markdownFile,
    "--summary true",
    "--omitHeader true",
    "--code true",
    "--resolve true",
].join(" ");

const ANSIEscapeCode = {
    cover: "\x1b[A",
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    white: "\x1b[37m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
};

const progress = {
    gauge: 0,
    full: 0,
};

function convertYamlToMd() {
    try {
        console.log(
            `\n${ANSIEscapeCode.blue}== START CONVERT api-docs.yaml TO docs.md ==${ANSIEscapeCode.reset}`
        );

        console.log(command);
        execSync(command);

        console.log(
            `${ANSIEscapeCode.blue}== END CONVERT api-docs.yaml TO docs.md ==${ANSIEscapeCode.reset}`
        );
    } catch (err) {
        console.error("err occurred -> ", err);
    }
}

module.exports = convertYamlToMd;
