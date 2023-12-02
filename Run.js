const util = require("util");
const exec = util.promisify(require("child_process").exec);

const commands = [
    "widdershins ./api-docs.yaml -o ./test/docs.md --summary true --omitHeader true --code true --resolve true",
    "node ./parser/ParseMarkdownByTag.js",
    "node ./parser/RemoveInnerRef.js",
    "node ./md-to-notion/MdToNotionForDir.js",
    "node ./md-to-notion/PostTagOnPage.js",
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
