#!/usr/bin/env node

const path = require('path');
const saveApiDocs = require(path
    .join(__dirname, "src", "SaveApiDocs"));
const convertYamlToMd = require(path
    .join(__dirname, "src", "ConvertYamlToMd"));
const extractSchema = require(path
    .join(__dirname, "src", "ExtractSchema"));
const parseMarkdownByTag = require(path
    .join(__dirname, "src", "ParseMarkdownByTag"));
const removeInnerRef = require(path
    .join(__dirname, "src", "RemoveInnerRef"));
const mdToNotionForDir = require(path
    .join(__dirname, "src", "MdToNotionForDir"));
const postTagOnPage = require(path
    .join(__dirname, "src", "PostTagOnPage"));

async function run() {
    await saveApiDocs();
    await convertYamlToMd();
    await extractSchema();
    await parseMarkdownByTag();
    await removeInnerRef();
    await mdToNotionForDir();
    //await postTagOnPage();
}

run();
