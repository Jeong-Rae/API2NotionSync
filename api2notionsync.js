#!/usr/bin/env node
const path = require('path');
const run = require(path.join(__dirname, "Run"));

var argv = { // 입력인자
    run: false,
    libVersion: [false, "api2notionsync v0.1.3"],
    help: false,
    markdown: false,
    oasVersion: 3,
    input: "",
    unknown: [],
};

/* 실행 함수 호출 */
function runAPI2NotionSync(argv) {
    run.run({ isMarkdownOnly: argv.markdown, pathInput : argv.input });
}

/* 도움말 출력 */
function help() {
    console.log("api2notionsync [options] [[-i] input .yaml] <command>\n");
    console.log("usage commands: ");
    console.log(helpTemplate("[ --run | -r ]", "Posts the API document to Notion", 16));
    console.log(helpTemplate("[ --help | -h ]", "Prints the help document", 16));
    console.log(
        helpTemplate("[ --version | -v ]", "Prints the library version", 16)
        );
    console.log("\nusage options: ");
    console.log(
        helpTemplate("[ --markdown | -m ] [Boolean]", "Obtains only the docs.md file as a result", 32)
    );
    console.log(
        helpTemplate("[ --input | -i ] [FilePath]", "Sets the absolute path of the yaml", 32)
        );
        console.log(
            helpTemplate("[ --oas_version | -s ] [number]", "Sets the version of OAS", 32)
            );
}

// 도움말 출력 템플릿
function helpTemplate(summary, description, range) {
    return `    ${summary.padEnd(range, " ")} ${description}`;
}

/* 인자 파싱 */
function parseArguments(args) {
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "--run":
                case "-r":
                argv.run = true;
                break;
                case "--version":
            case "-v":
                argv.libVersion[0] = true;
                break;
            case "--markdown":
            case "-m":
                if (i + 1 < args.length) {
                    argv.markdown = args[++i];
                }
                break;
            case "--oas_version":
            case "-s":
                if (i + 1 < args.length) {
                    argv.oasVersion = parseInt(args[++i]);
                }
                break;
            case "--input":
            case "-i":
                if (i + 1 < args.length) {
                    argv.input = args[++i];
                }
                break;
            case "--help":
            case "-h":
                argv.help = true;
                break;
            case "--NOTION_API_KEY":
                if (i + 1 < args.length) {
                    process.env.NOTION_API_KEY = args[++i];
                    console.log(process.env.NOTION_API_KEY);
                }
                break;
            case "--NOTION_PAGE_ID":
                if (i + 1 < args.length) {
                    process.env.NOTION_PAGE_ID = args[++i];
                    console.log(process.env.NOTION_PAGE_ID);
                }
                break;
            case "--host":
                if (i + 1 < args.length) {
                    process.env.SERVER_HOST = args[++i];
                }
                break;
            default:
                argv.unknown.push(args[i]);
                break;
        }
    }
}

/* 인자 유효성 검사 */
function checkValid(argv) {
    if (argv.unknown.length > 0) {
        const validArgs = [
            "--run",
            "--version",
            "--markdown",
            "--oas_version",
            "--input",
            "--help",
            "--host",
            "--NOTION_API_KEY",
            "--NOTION_PAGE_ID"
        ];

        console.log("Invalid Arguments: " + argv.unknown.join(", "));

        argv.unknown.forEach((arg) => {
            if (arg.startsWith("--")) {
                let mostSimilar = validArgs.reduce((a, b) =>
                    similarity(arg, a) > similarity(arg, b) ? a : b
                );
                if (
                    (arg.length - editDistance(arg, mostSimilar)) / arg.length >
                    0.6
                ) {
                    console.log(`The most similar command  '"${mostSimilar}"'`);
                }
            }
        });

        process.exit(1);
    }

    if (!argv.run && (argv.markdown !== false || argv.input !== "./resource")) {
        console.log(
            'Do you want to run? then include "--run" or "-r" in the command'
        );
        process.exit(1);
    }

    let actionCount = 0;
    let actionArgs = [];
    if (argv.run) {
        actionCount++;
        actionArgs.push("--run");
    }
    if (argv.libVersion[0]) {
        actionCount++;
        actionArgs.push("--version");
    }
    if (argv.help) {
        actionCount++;
        actionArgs.push("--help");
    }

    if (actionCount > 1) {
        console.log("Select One Argument: " + actionArgs.join(", "));
        process.exit(1);
    }
}

// 문자열 유사도
function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (
        (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength)
    );
}

// 문자열 변형 정도
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue =
                            Math.min(Math.min(newValue, lastValue), costs[j]) +
                            1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function api2notionsync(args, argv) {
    parseArguments(args);
    checkValid(argv);
    if (argv.run) runAPI2NotionSync(argv);
    if (argv.libVersion[0]) console.log(argv.libVersion[1]);
    if (argv.help) help();
}

const args = process.argv.slice(2);
api2notionsync(args, argv);
