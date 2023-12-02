const { exec } = require("child_process");
const process = require("process");

const commands = [
    "widdershins ./api-docs.yaml -o docs.md --summary true --omitHeader true --code true --resolve true",
    "node ./parser/ParseMarkdownByTag.js",
    "node ./parser/RemoveInnerRef.js",
    "node ./md-to-notion/MdToNotionForDir.js",
    "node ./md-to-notion/PostTagOnPage.js",
];

function runCommand() {
    for (i = 0; i < commands.length; i++) {
        exec(commands[i], (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(`${stdout}`);
        });
    }
}

runCommand();
