const path = require('path');
const saveApiDocs = require(path
    .join(__dirname, "src", "SaveApiDocs"));
const convertYamlToMd = require(path
    .join(__dirname, "src", "ConvertYamlToMd"));
const extractSchema = require(path
    .join(__dirname, "src", "ExtractSchema"));
const parseMarkdownByTag = require(path
    .join(__dirname, "src", "ParseMarkdownByTag"));
const updateMarkdownStyles = require(path
    .join(__dirname, "src", "UpdateMarkdownStyles"));
const mdToNotionForDir = require(path
    .join(__dirname, "src", "MdToNotionForDir"));
const postTagOnPage = require(path
    .join(__dirname, "src", "PostTagOnPage"));

async function run({ isMarkdownOnly = false, pathInput = "", env ={} } = {}) {
    console.log(env.SERVER_HOST);
    console.log(env.NOTION_API_KEY);
    console.log(env.NOTION_PAGE_ID);
    await saveApiDocs(env.SERVER_HOST, pathInput);
    await convertYamlToMd();
    if (isMarkdownOnly) {
        return;
    }
    await extractSchema();
    await parseMarkdownByTag();
    await updateMarkdownStyles();
    await mdToNotionForDir();
    await postTagOnPage(env.NOTION_API_KEY, env.NOTION_PAGE_ID);
}

module.exports = {
    run,
};