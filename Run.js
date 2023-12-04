const util = require("util");
const exec = util.promisify(require("child_process").exec);

const commands = [
    "node ./src/SaveApiDocs",
    "node ./node_modules/widdershins/widdershins.js ./resource/api-docs.yaml -o ./test/docs.md --summary true  --omitHeader true --code true --resolve true",
    "node ./src/ParseMarkdownByTag.js",
    "node ./src/RemoveInnerRef.js",
    "node ./src/MdToNotionForDir.js",
    "node ./src/PostTagOnPage.js",
];

async function runCommand() {
    for (const command of commands) {
        try {
            const { stdout, stderr } = await exec(command);
            console.log(stdout);
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
        } catch (error) {
            console.error(`Error executing ${command}: ${error.message}`);
            break;
        }
    }
}

runCommand();
