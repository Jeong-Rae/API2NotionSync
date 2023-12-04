# API2NotionSync

## API 자동 Notion에 포스팅하기

### 모든 작업을 순차실행

```shell
node ./src/Run.js
```

### 임시 저장 공간인 test 생성

```
mkdir test
```

### yaml -> md 변환

```shell
node widdershins ./resource/api-docs.yaml -o ./test/docs.md --summary true  --omitHeader true --code true --resolve true
```

### tag 기준으로 docs.md을 메서드 단위로 분할

```shell
node .\src\ParseMarkdownByTag.js
```

### 내부 참조 제거하기

```shell
node .\src\RemoveInnerRef.js
```

### test에 있는 모든 md을 notion식 블록 json으로 변경

```shell
node .\src\MdToNotionForDir.js
```

### 모든 태그 notion에 post

```shell
node .\src\PostBatchOnPage.js
```
