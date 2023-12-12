# API2NotionSync

## Automatic Posting API docs to Notion

## Known Issues
- *~~Permission Error Issue~~* / Resolved on 2023-12-12
- *~~Environment Variable Application Error~~* / Resolved on 2023-12-12

## Table of Contents

- [How to Use in CLI](#cli-global)
	- [Installation](#to-install)
	- [Example Usage](#example)
	- [Options](#options)
- [How to Use in JS Projects](#using-in-project)
	- [server.js](#serverjs)
	- [Setting .env Environment Variables](#setting-env-environment-variables)
	- [Setting Environment Variables in Terminal](#setting-environment-variables-in-terminal)
- [Anticipated Issues]()
	- [Save Api Docs Stage - Waiting for Axios](#saveapidocs-stage---waiting-for-axios)
	- [All Tag Docs Posting Stage - Failure to Post](#all-tag-docs-posting---failure-to-post)

## CLI Global

### To Install
- Clone the repository and run `npm install`
- or, install globally with `npm install -g api2notionsync`

### Example
```
api2notionsync --run --host "https://www.example.com" --NOTION_API_KEY {your_API_KEY} --NOTION_PAGE_ID {your_notion_page_id}
```

### Options
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| -r, --run | NONE | NONE | Initiates posting of API documentation to Notion. |
| -v, --version | NONE | NONE | Displays the library's version. |
| -h, --help | NONE | NONE | Provides help regarding library options. |
| --host | `string` | NONE | Sets the host of the server with `swagger` or `OpenApi v3` documentation. This is set as an environment variable and can be registered using `EXPORT SERVER_HOST=?`. Retrieves the file from `/v3/api-docs.yaml`. | 
| --NOTION_API_KEY | `string` | NONE | Enter your NOTION API KEY obtained from the Notion API. Set it as an environment variable, registerable via `EXPORT NOTION_API_KEY=?`. |
| --NOTION_PAGE_ID | `string` | NONE | Enter your NOTION PAGE ID obtained from the Notion API. Set it as an environment variable, registerable via `EXPORT NOTION_PAGE_ID=?`. |
| -m, --markdown | `boolean` | `false` | Use this option to convert the document to markdown without posting to Notion. Saved as `docs.md` in the library's `temp` directory. |
| -i, --input | `string` | `.\resource` | If you have a .YAML API document formatted to OAS v3, enter its absolute path. If entered correctly, the file from your local path will be used. |

## Using in Projects

### To Install
- `npm install api2notionsync`

### server.js
```js
// server.js
const api2notionsync = require('api2notionsync');

/* your swagger setting */

// Check if the following swagger-jsdoc settings are present
const swaggerYaml = yaml.dump(swaggerSpec);
app.get('/v3/api-docs.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/yaml');
    res.send(swaggerYaml);
});

/* your server code */

// append this command
api2notionsync.run();
```
> You can optionally specify the arguments to pass when calling the method.
```js
api2notionsync.run({ isMarkdownOnly: true, pathInput: "./your/path" });

api2notionsync.run({ pathInput: "./your/path" });
```

### Setting .env Environment Variables

> Ensure your `.env` file contains API key information for Notion and the server host for API documentation. Read the `.env` file using the `dotenv` library.
``` properties
//.env file

NOTION_API_KEY=secret_example
NOTION_PAGE_ID=example
SERVER_HOST=https://www.example.com
```

### Setting Environment Variables in Terminal
> Without a `.env` file, you can directly set environment variables in the terminal as follows:

#### Linux, macOS
```shell
export NOTION_API_KEY="secret_example"
export NOTION_PAGE_ID="example"
export SERVER_HOST="https://www.example.com"
```

#### Windows (PowerShell)
```powershell
$env:NOTION_API_KEY="secret_example"
$env:NOTION_PAGE_ID="example"
$env:SERVER_HOST="https://www.example.com"
```

## Anticipated Issues

### 1. SaveApiDocs Stage - Waiting for Axios

### Issue
Occurrence of `저장 대기 n회`
> Our library searches for a file named `api-docs.yaml` at `SERVER_HOST/v3/api-docs.yaml`.  
> If unable to find this path, it sends requests up to 10 times every 5 seconds
> Continuous occurrence of `저장 대기 n회` indicates a need to check the `v3/api-docs.yaml` path.

### Solution
- `Java`: The yaml path is automatically set. Issues have been identified with v2, and a fix is planned.
- `Node`: You must manually specify the path using `swagger-jsdoc`. If you have set up swagger using `swagger-ui-express`, it's a straightforward process. Insert the following code in a suitable location within your JS project.
```js
const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('js-yaml');

const swaggerYaml = yaml.dump(swaggerSpec);

// An example app.use code for comparison.
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/v3/api-docs.yaml', (req, res) => {
    res.setHeader('Content-Type', 'application/yaml');
    res.send(swaggerYaml);
});
```

### 2. All Tag Docs Posting - Failure to Post

### Issue
Occurrence of a `red gauge` during All Tag Docs Posting
> Checking node_modules/log/trace.error is the best approach.   
> Typically, failure to post a specific item stems from Notion Api specifications, often occurring when the converted Md is excessively large.
> If failures persist for all postings, check the status of the Notion page and network.

### Solution
- Continuous failure for all postings: Check the status of the Notion page and network.
- Failure of individual postings: Separate the API requests. A fix is planned for this issue.
