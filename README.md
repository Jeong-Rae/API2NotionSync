# API2NotionSync

API 자동 Notion에 포스팅하기

```shell
node Run.js
```
아래 주어진 작업을 순차실행

```shell
cd test
```
test 경로로 이동 기준 작성

```shell
widdershins ..\api-docs.yaml -o docs.md --summary true  --omitHeader true --code true --resolve true
```
yaml -> md

```shell
node ..\parser\ParseMarkdownByTag.js
```
tag 기준으로 docs.md을 메서드 단위로 분할

```shell
node ..\parser\RemoveInnerRef.js
```
내부 참조 삭제하기

```shell
node ..\md-to-notion\convertDir.js
```
test에 있는 모든 md을 notion식 블록 json으로 변경

```shell
node ..\md-to-notion\postBatch_page.js ${tag}
```
tag에 해당하는 메서드 포스팅
