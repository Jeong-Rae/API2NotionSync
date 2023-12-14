const path = require("path");
const saveApiDocs = require(path.join(__dirname, "src", "SaveApiDocs"));
const convertYamlToMd = require(path.join(__dirname, "src", "ConvertYamlToMd"));
const extractSchema = require(path.join(__dirname, "src", "ExtractSchema"));
const parseMarkdownByTag = require(path.join(
    __dirname,
    "src",
    "ParseMarkdownByTag"
));
const updateMarkdownStyles = require(path.join(
    __dirname,
    "src",
    "UpdateMarkdownStyles"
));
const mdToNotionForDir = require(path.join(
    __dirname,
    "src",
    "MdToNotionForDir"
));
const postTagOnPage = require(path.join(__dirname, "src", "PostTagOnPage"));

async function run({ isMarkdownOnly = false, pathInput = "", env = {} } = {}) {
    const {
        SERVER_HOST = process.env.SERVER_HOST,
        NOTION_API_KEY = process.env.NOTION_API_KEY,
        NOTION_PAGE_ID = process.env.NOTION_PAGE_ID,
    } = env;

    console.log(SERVER_HOST);
    console.log(NOTION_API_KEY);
    console.log(NOTION_PAGE_ID);
    await saveApiDocs(SERVER_HOST, pathInput);
    await convertYamlToMd();
    if (isMarkdownOnly) {
        return;
    }
    await extractSchema();
    await parseMarkdownByTag();
    await updateMarkdownStyles();
    await mdToNotionForDir();
    await postTagOnPage(NOTION_API_KEY, NOTION_PAGE_ID);
}

module.exports = {
    run,
};
