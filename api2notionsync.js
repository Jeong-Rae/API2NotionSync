let argv = {
    run: false,
    libVersion: false,
    help: false,
    markdown: false,
    oasVersion: 3,
    input: "./resource",
    unknown: [],
};

function run() {
    console.log("run() 함수 실행");
}

function getMd() {
    console.log("getMd() 함수 실행");
}

function helpTemplate(summary, description, range) {
    return `    ${summary.padEnd(range, " ")} ${description}`;
}

function help() {
    console.log("api2notionsync [options] [[-i] input .yaml] <command>\n");
    console.log("usage commands: ");
    console.log(helpTemplate("[ --run | -r ]", "post docs", 16));
    console.log(helpTemplate("[ --help | -h ]", "print help", 16));
    console.log(helpTemplate("[ --version | -v ]", "print library version", 16));
    console.log("\nusage options: ");
    console.log(helpTemplate("[ --markdown | -m ] [Boolean]", "not post, only get docs.md", 32));
    console.log(helpTemplate("[ --input | -i ] [FilePath]", "set yaml path ", 32));
    console.log(helpTemplate("[ --oas_version | -s ] [number]", "set OAS version", 32));
}

function parseArguments(args) {
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "--run":
            case "-r":
                argv.run = true;
                break;
            case "--version":
            case "-v":
                argv.libVersion = true;
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
            default:
                argv.unknown.push(args[i]);
                break;
        }
    }
}

function checkValid(argv) {
    if (argv.unknown.length > 0) {
        const validArgs = [
            "--run",
            "--version",
            "--markdown",
            "--oas_version",
            "--input",
            "--help",
        ];

        console.log("Invalid Arguments: " + argv.unknown.join(", "));

        argv.unknown.forEach((arg) => {
            if (arg.startsWith("--")) {
                let mostSimilar = validArgs.reduce((a, b) =>
                    similarity(arg, a) > similarity(arg, b) ? a : b
                );
				if ((arg.length - editDistance(arg, mostSimilar)) / arg.length > 0.6) {
					console.log(`maybe use "${mostSimilar}"?`);
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
    if (argv.libVersion) {
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

const args = process.argv.slice(2);
parseArguments(args);
checkValid(argv);

if (argv.run) run();
if (argv.libVersion) console.log("라이브러리 버전: " + argv.oasVersion);
if (argv.help) help();
if (argv.markdown) getMd();
if (argv.oasVersion !== 3) console.log("OAS 버전: " + argv.oasVersion);
if (argv.input !== "./resource") console.log("입력 경로: " + argv.input);
