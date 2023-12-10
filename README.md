# API2NotionSync

## Automatic Posting to Notion via API

## Table of Contents

- [How to Use in CLI](#cli-global)
	- [Installation](#to-install)
	- [Example Usage](#example)
	- [Options](#options)
- [How to Use in JS Projects](#using-in-project)
	- [server.js](#serverjs)
	- [Setting .env Environment Variables](#setting-.env-environment-variables)
	- [Setting Environment Variables in Terminal](#setting-environment-variables-in-terminal)

## CLI Global

### To Install
- Clone the repository and run `npm install`
- Then, `npm install -g api2notionsync`

### Example
```
api2notionsync --run --host "https://www.example.com" --NOTION_API_KEY {your_API_KEY} --NOTION_PAGE_ID {your_notion_page_id}
```

### Options
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| -r, --run | NONE | NONE | Starts posting API documentation to Notion. |
| -v, --version | NONE | NONE | Displays the version of the library. |
| -h, --help | NONE | NONE | Displays help for library options. |
| --host | `string` | NONE | Set the host of the server where `swagger` or `OpenApi v3` documentation is applied. This value is set as an environment variable, and can be registered with `EXPORT SERVER_HOST=?`. Fetches the file from `/v3/api-docs.yaml`. | 
| --NOTION_API_KEY | `string` | NONE | Enter the NOTION API KEY issued by the Notion API. This value is set as an environment variable, and can be registered with `EXPORT NOTION_API_KEY=?`. |
| --NOTION_PAGE_ID | `string` | NONE | Enter the NOTION PAGE ID issued by the Notion API. This value is set as an environment variable, and can be registered with `EXPORT NOTION_PAGE_ID=?`. |
| -m, --markdown | `boolean` | `false` | An option to use if you want to obtain the document converted to markdown without posting to Notion. The document will be saved in the `temp` directory of this library as `docs.md`. |
| -i, --input | `string` | `.\resource` | If you already have an OAS v3 formatted .YAML API document, enter the absolute path of that file. If entered correctly, you can use the file located at your local path. |

## Using in Projects

### server.js
```js
// server.js
const api2notionsync = require('api2notionsync');

/* 
...
your server code
...
*/

// append command
api2notionsync.run();
```
You can selectively determine the arguments to be passed when called in the following way.
```js
api2notionsync.run({ isMarkdownOnly: true, pathInput: "./your/path" });

api2notionsync.run({ pathInput: "./your/path" });
```
### Setting .env Environment Variables

The `.env` file should contain information related to the API key for Notion, and the server host where the API documentation is located. You can read the `.env` file using the `dotenv` library.
``` properties
//.env file

NOTION_API_KEY="secret_example"
NOTION_PAGE_ID="example"
SERVER_HOST="https://www.example.com"
```

### Setting Environment Variables in Terminal
For testing purposes without a `.env` file, you can directly set the environment variables in the `terminal` as follows:

#### Linux, macOS
```shell
export NOTION_API_KEY="secret_example"
export NOTION_PAGE_ID="example"
export SERVER_HOST="https://www.example.com"
```

#### Windows
```shell
$env:NOTION_API_KEY="secret_example"
$env:NOTION_PAGE_ID="example"
$env:SERVER_HOST="https://www.example.com"
```
