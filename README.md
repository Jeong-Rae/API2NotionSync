# API2NotionSync

## API 자동 Notion에 포스팅하기

## 목차

- [CLI에서 사용하는 법](#cli-global)
	- [설치방법](#to-install)
	- [입력예시](#example)
	- [옵션](#options)
- [JS 프로젝트에서 사용하는 법](#project에서-사용하기)
	- [server.js](#serverjs)
	- [.env 환경변수 설정](#환경변수-env-등록-사항)

## CLI Global

### To Install
- repository를 clone 후 `npm install`
- `npm install -g api2notionsync`

### Example
```
api2notionsync --run --host "https://www.example.com" --NOTION_API_KEY {your_API_KEY} --NOTION_PAGE_ID {your_notion_page_id}
```

### Options
| parameter | Type | Default | Description |
| --- | --- | --- | --- |
| -r, --run | NONE | NONE | 노션에 api 문서 포스팅을 시작합니다. |
| -v, --version | NONE | NONE | library의 버전을 출력합니다. |
| -h, --help | NONE | NONE | library 옵션에 대한 도움말을 출력합니다. |
| --host | `string` | NONE | `swagger` or `OpenApi v3` 문서가 적용되어 있는 server의 host 를 인자로 받아 설정합니다. 이후 해당 값을 환경 변수로 설정하며, `EXPORT SERVER_HOST=?`를 통하여 등록할 수 있습니다. `/v3/api-docs.yaml`에 대한 파일을 가져옵니다.  | 
| --NOTION_API_KEY | `string` | NONE | 통한 노션 API에서 발급한 NOTION API KEY를 입력하세요. 이후 해당 값을 환경 변수로 설정하며, `EXPORT NOTION_API_KEY=?`를 통하여 등록할 수 있습니다. |
| --NOTION_PAGE_ID | `string` | NONE | 통한 노션 API에서 발급한 NOTION API KEY를 입력하세요. 이후 해당 값을 환경 변수로 설정하며, `EXPORT NOTION_PAGE_ID=?`를 통하여 등록할 수 있습니다. |
| -m, --markdown | `boolean` | `false` | 만약 notion에 포스팅까지 원하지 않고, 단순히 markdown으로 변환된 문서를 얻고자 한다면 사용할 수 있는 옵션입니다. 해당 라이브러리의 `temp` 디렉토리에 `docs.md`로 저장됩니다. |
| -i, --input | `string` | `.\resource` | 만약 이미 OAS v3 양식으로 작성된 .YAML API문서가 있다면, 해당 파일의 절대경로를 입력하세요. 올바르게 입력되었다면, 로컬 경로에 있는 파일을 사용할 수 있습니다. |

## Project에서 사용하기

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
run();
```
### 환경변수 .env 등록 사항

`.env`에 notion에 등록되기 위한 api관련 정보와, api문서가 등록되어 있는 server host를 등록해두어야 합니다.
`dotenv` 라이브러리를 통하여 `.env`파일을 읽을 수 있습니다.
``` properties
//.env file

NOTION_API_KEY=secret_example
NOTION_PAGE_ID=example
SERVER_HOST=https://www.example.com
```
