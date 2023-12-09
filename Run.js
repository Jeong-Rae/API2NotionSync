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

const NOTION_API_KEY = process.env.NOTION_API_KEY; // 노션 API 키
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID; // 부모 페이지 ID
//const NOTION_API_KEY="secret_xm5CmdMZQfkW35nk7NA7sy78shS4XewVcLjc6kfmCfG"; // 노션 API 키
//const  NOTION_PAGE_ID="a79064c764414e4b976be7681ca7af1b"; // 부모 페이지 ID
const SERVER_HOST = process.env.SERVER_HOST; // 연동할 서버 주소


async function run(isMarkdownOnly, pathInput) {
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
    fs
}

module.exports = run;