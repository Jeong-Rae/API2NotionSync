
<h1 id="-api-">세종대 인터페이스 API 정보 v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

세종대 인터페이스 API 정보

Base URLs:

* <a href="http://localhost:8080">http://localhost:8080</a>

# Authentication

* API Key (JWT)
    - Parameter Name: **Authorization**, in: header. 

<h1 id="-api--vote">Vote</h1>

투표 API

## 투표자 선택 조회

<a id="opIdfindVoterBySubjectIdAndUserId"></a>

`GET /api/votes/voter`

주제와 유저id로 투표 정보를 조회합니다.

<h3 id="투표자-선택-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subjectId|query|integer(int64)|true|none|
|userId|query|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="투표자-선택-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[VoterDTO](#schemavoterdto)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표자 선택 수정

<a id="opIdupdateVoter"></a>

`PUT /api/votes/voter`

선택한 옵션을 다른 옵션으로 수정합니다.

> Body parameter

```json
{
  "voterId": 0,
  "optionId": 0
}
```

<h3 id="투표자-선택-수정-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VoterUpdateRequest](#schemavoterupdaterequest)|true|none|

> Example responses

> 200 Response

<h3 id="투표자-선택-수정-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[VoterDTO](#schemavoterdto)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표자 등록

<a id="opIdregisterVote"></a>

`POST /api/votes/voter`

투표자와 선택을 등록합니다.

> Body parameter

```json
{
  "voterId": 0,
  "subjectId": 0,
  "optionId": 0,
  "userId": 0
}
```

<h3 id="투표자-등록-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[VoterDTO](#schemavoterdto)|true|none|

> Example responses

> 200 Response

<h3 id="투표자-등록-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[VoterDTO](#schemavoterdto)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 주제 전체 조회

<a id="opIdfindAllSubjects"></a>

`GET /api/votes`

모든 투표 주제를 조회합니다.

> Example responses

> 200 Response

<h3 id="투표-주제-전체-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="투표-주제-전체-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[SubjectResponse](#schemasubjectresponse)]|false|none|none|
|» subjectId|integer(int64)|false|none|none|
|» subject|string|false|none|none|
|» startDate|string(date-time)|false|none|none|
|» endDate|string(date-time)|false|none|none|
|» total|integer(int32)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 주제 등록

<a id="opIdcreateVote"></a>

`POST /api/votes`

투표 주제와 기한, 하위 선택지를 등록합니다.

> Body parameter

```json
{
  "subject": "string",
  "startDateTime": "2019-08-24T14:15:22Z",
  "endDateTime": "2019-08-24T14:15:22Z",
  "options": [
    {
      "option": "string"
    }
  ]
}
```

<h3 id="투표-주제-등록-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SubjectRequest](#schemasubjectrequest)|true|none|

> Example responses

> 200 Response

<h3 id="투표-주제-등록-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[CreateResponse](#schemacreateresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 상태별 조회

<a id="opIdfindSubjectsByStatus"></a>

`GET /api/votes/subjects`

투표를 상태 구분에 따라 조회합니다.

<h3 id="투표-상태별-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|status|query|string|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|COMPLETED|
|status|ONGOING|
|status|UPCOMING|

> Example responses

> 200 Response

<h3 id="투표-상태별-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="투표-상태별-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[SubjectResponse](#schemasubjectresponse)]|false|none|none|
|» subjectId|integer(int64)|false|none|none|
|» subject|string|false|none|none|
|» startDate|string(date-time)|false|none|none|
|» endDate|string(date-time)|false|none|none|
|» total|integer(int32)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 주제 상세 조회

<a id="opIdfindBySubjectId"></a>

`GET /api/votes/subject/{id}`

해당 id의 투표 주제와 선택지 정보를 조회합니다.

<h3 id="투표-주제-상세-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="투표-주제-상세-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[OptionResponse](#schemaoptionresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 주제 삭제

<a id="opIddeleteSubject"></a>

`DELETE /api/votes/subject/{id}`

해당 path의 id를 가지는 subject를 table에서 제거합니다.

<h3 id="투표-주제-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

<h3 id="투표-주제-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 선택 철회

<a id="opIddeleteVoter"></a>

`DELETE /api/votes/voter/{id}`

해당 path의 id를 가지는 voter를 table에서 제거합니다.

<h3 id="투표-선택-철회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

<h3 id="투표-선택-철회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 선택지 삭제

<a id="opIddeleteOption"></a>

`DELETE /api/votes/option/{id}`

해당 path의 id를 가지는 option을 table에서 제거합니다.

<h3 id="투표-선택지-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

<h3 id="투표-선택지-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--schedule">Schedule</h1>

일정 관리 API

## 일정 전체 조회

<a id="opIdfindAllSchedules"></a>

`GET /api/schedules`

모든 일정을 조회합니다.

> Example responses

> 200 Response

<h3 id="일정-전체-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="일정-전체-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ScheduleResponse](#schemascheduleresponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» title|string|false|none|none|
|» description|string|false|none|none|
|» startDate|string(date-time)|false|none|none|
|» endDate|string(date-time)|false|none|none|
|» allDay|boolean|false|none|none|
|» type|string|false|none|none|
|» boardId|integer(int64)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|GROUP|
|type|ACADEMIC|
|type|ETC|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 신규 일정 등록

<a id="opIdcreateSchedule"></a>

`POST /api/schedules`

신규 일정을 생성합니다.

항상 시작일이 종료일보다 빨라야합니다. allDay 설정시 시작시간은 0시0분0초, 종료시간은 23시59분59초로 고정됩니다.

Type : GROUP(동아리 일정), ACADEMIC(학사 일정), ETC(기타 일정)

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "startDate": "2019-08-24T14:15:22Z",
  "endDate": "2019-08-24T14:15:22Z",
  "allDay": true,
  "type": "GROUP"
}
```

<h3 id="신규-일정-등록-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ScheduleRequest](#schemaschedulerequest)|true|none|

> Example responses

> 200 Response

<h3 id="신규-일정-등록-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Schedule](#schemaschedule)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 일정 단건 조회

<a id="opIdfindById"></a>

`GET /api/schedules/{id}`

특정 일정을 해당 일정 id로 조회합니다.

<h3 id="일정-단건-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="일정-단건-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[ScheduleResponse](#schemascheduleresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 일정 삭제

<a id="opIddeleteSchedule"></a>

`DELETE /api/schedules/{id}`

해당 id의 일정을 제거합니다.

<h3 id="일정-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

<h3 id="일정-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 일정 월간 조회

<a id="opIdfindByMonth"></a>

`GET /api/schedules/month/{month}`

특정 월이 포함된 일정을 조회합니다.

<h3 id="일정-월간-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|month|path|integer(int32)|true|1 ~ 12 까지 정수로 입력|

> Example responses

> 200 Response

<h3 id="일정-월간-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="일정-월간-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ScheduleResponse](#schemascheduleresponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» title|string|false|none|none|
|» description|string|false|none|none|
|» startDate|string(date-time)|false|none|none|
|» endDate|string(date-time)|false|none|none|
|» allDay|boolean|false|none|none|
|» type|string|false|none|none|
|» boardId|integer(int64)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|GROUP|
|type|ACADEMIC|
|type|ETC|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 일정 일간 조회

<a id="opIdfindByDate"></a>

`GET /api/schedules/date/{date}`

특정 날짜가 포함된 일정을 조회합니다.

<h3 id="일정-일간-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|date|path|string(date)|true|yyyy-MM-dd 형식의 날짜 입력|

> Example responses

> 200 Response

<h3 id="일정-일간-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="일정-일간-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[ScheduleResponse](#schemascheduleresponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» title|string|false|none|none|
|» description|string|false|none|none|
|» startDate|string(date-time)|false|none|none|
|» endDate|string(date-time)|false|none|none|
|» allDay|boolean|false|none|none|
|» type|string|false|none|none|
|» boardId|integer(int64)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|GROUP|
|type|ACADEMIC|
|type|ETC|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--subscription">Subscription</h1>

Topic 구독 관리 api

## Vote topic 구독 상태 변경

<a id="opIdresetBadgeCount"></a>

`POST /api/subscription/{userId}/badge`

해당 id를 가지는 유저의 badge count를 0으로 변경한다

<h3 id="vote-topic-구독-상태-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer(int64)|true|none|

> Example responses

> 404 Response

<h3 id="vote-topic-구독-상태-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|badge 0으로 초기화|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|존재 하지 않는 userId|[BaseExceptionResponse](#schemabaseexceptionresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## Notice topic 구독 상태 변경

<a id="opIdupdateNoticeSubscriptionStatus"></a>

`POST /api/subscription/{userId}/notice`

해당 id를 가지는 유저의 Notice 구독 정보를 변경한다.

인자는 true가 구독을 하는 것으로 한다

> Body parameter

```json
{
  "fcmToken": "string",
  "notice": true,
  "schedule": true,
  "vote": true
}
```

<h3 id="notice-topic-구독-상태-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer(int64)|true|none|
|body|body|[SubscriptionRequest](#schemasubscriptionrequest)|true|none|

> Example responses

> 200 Response

<h3 id="notice-topic-구독-상태-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|구독 상태 변경 성공|[SubscriptionResponse](#schemasubscriptionresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|존재 하지 않는 userId,

notice 항목이 null|[BaseExceptionResponse](#schemabaseexceptionresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## FCM Token 변경

<a id="opIdupdateFcmToken"></a>

`POST /api/subscription/{userId}/fcm-token`

해당 id를 가지는 유저의 FCM Token을 새로 변경한다.

> Body parameter

```json
{
  "fcmToken": "string",
  "notice": true,
  "schedule": true,
  "vote": true
}
```

<h3 id="fcm-token-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer(int64)|true|none|
|body|body|[SubscriptionRequest](#schemasubscriptionrequest)|true|none|

> Example responses

> 200 Response

<h3 id="fcm-token-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|token 변경 성공|[SubscriptionResponse](#schemasubscriptionresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|존재 하지 않는 userId|[BaseExceptionResponse](#schemabaseexceptionresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## Topic 구독 상태 반환

<a id="opIdgetSubscriptionTopic"></a>

`GET /api/subscription/{userId}/topic`

해당 id를 가지는 유저의 구독중인 Topic 정보를 반환한다

<h3 id="topic-구독-상태-반환-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="topic-구독-상태-반환-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|topic 정보 반환 성공|[SubscriptionResponse](#schemasubscriptionresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|존재 하지 않는 userId|[BaseExceptionResponse](#schemabaseexceptionresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--board">Board</h1>

게시글 API

## 게시글 조회

<a id="opIdfindById_1"></a>

`GET /api/boards/board/{id}`

글 id로 글을 조회합니다.

<h3 id="게시글-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="게시글-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardResponse](#schemaboardresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 글 업데이트

<a id="opIdupdate"></a>

`PUT /api/boards/board/{id}`

해당 id의 게시글을 수정합니다.

> Body parameter

```json
{
  "boardRequest": {
    "title": "string",
    "content": "string",
    "userId": 0,
    "scheduleId": 0,
    "subjectId": 0
  },
  "multipartFileList": [
    "string"
  ]
}
```

<h3 id="글-업데이트-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|object|false|none|
|» boardRequest|body|[BoardRequest](#schemaboardrequest)|false|none|
|»» title|body|string|false|none|
|»» content|body|string|false|none|
|»» userId|body|integer(int64)|false|none|
|»» scheduleId|body|integer(int64)|false|none|
|»» subjectId|body|integer(int64)|false|none|
|» multipartFileList|body|[string]|false|none|

> Example responses

> 200 Response

<h3 id="글-업데이트-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardResponse](#schemaboardresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 글 삭제

<a id="opIddelete"></a>

`DELETE /api/boards/board/{id}`

글 id로 게시글을 삭제합니다.

<h3 id="글-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="글-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardResponse](#schemaboardresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 모든 글 조회

<a id="opIdgetAllBoards"></a>

`GET /api/boards`

모든 글을 조회합니다.

> Example responses

> 200 Response

<h3 id="모든-글-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="모든-글-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[BoardResponse](#schemaboardresponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» title|string|false|none|none|
|» content|string|false|none|none|
|» userId|integer(int64)|false|none|none|
|» scheduleId|integer(int64)|false|none|none|
|» subjectId|integer(int64)|false|none|none|
|» createDate|string(date-time)|false|none|none|
|» updateDate|string(date-time)|false|none|none|
|» fileNames|[string]|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 글 작성

<a id="opIdcreate"></a>

`POST /api/boards`

새로운 글을 생성합니다.

> Body parameter

```yaml
multipartFileList:
  - string

```

<h3 id="글-작성-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|title|query|undefined|false|none|
|content|query|undefined|false|none|
|userId|query|undefined|false|none|
|scheduleId|query|undefined|false|none|
|subjectId|query|undefined|false|none|
|body|body|object|false|none|
|» multipartFileList|body|[string]|false|none|

> Example responses

> 200 Response

<h3 id="글-작성-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardResponse](#schemaboardresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## saveComment

<a id="opIdsaveComment"></a>

`POST /api/boards/Comment/{id}`

<h3 id="savecomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|commentId|path|integer(int64)|true|none|
|boardId|query|integer(int64)|true|none|
|userId|query|integer(int64)|true|none|
|content|query|string|true|none|

> Example responses

> 200 Response

<h3 id="savecomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Comment](#schemacomment)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## deleteComment

<a id="opIddeleteComment"></a>

`DELETE /api/boards/Comment/{id}`

<h3 id="deletecomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|commentId|path|integer(int64)|true|none|

<h3 id="deletecomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 작성자 id로 글 조회

<a id="opIdfindByUserId"></a>

`GET /api/boards/user/{id}`

작성자 id로 모든 글을 조회합니다.

<h3 id="작성자-id로-글-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="작성자-id로-글-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="작성자-id로-글-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[BoardResponse](#schemaboardresponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» title|string|false|none|none|
|» content|string|false|none|none|
|» userId|integer(int64)|false|none|none|
|» scheduleId|integer(int64)|false|none|none|
|» subjectId|integer(int64)|false|none|none|
|» createDate|string(date-time)|false|none|none|
|» updateDate|string(date-time)|false|none|none|
|» fileNames|[string]|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 모든 글 제목

<a id="opIdgetAllTitles"></a>

`GET /api/boards/title`

글 목록 조회 시 제목 리스트만 반환합니다.

> Example responses

> 200 Response

<h3 id="모든-글-제목-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="모든-글-제목-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[TitleDto](#schematitledto)]|false|none|none|
|» title|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 투표 주제 id로 글 조회

<a id="opIdfindBySubjectId_1"></a>

`GET /api/boards/subject/{id}`

투표 주제 id로 글을 조회합니다

<h3 id="투표-주제-id로-글-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="투표-주제-id로-글-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardResponse](#schemaboardresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 일정 id로 글 조회

<a id="opIdfindByScheduleId"></a>

`GET /api/boards/schedule/{id}`

일정 id로 글을 조회합니다

<h3 id="일정-id로-글-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="일정-id로-글-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardResponse](#schemaboardresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 최근 글 page 단위로 조회

<a id="opIdgetBoardPages"></a>

`GET /api/boards/paged`

최근 size개의 글을 page 단위로 조회합니다.

size가 10일 때, page0은 1~10, page1은 11~20.. page i는 (i * 10 + 1) ~ (i * 10 + 10) 번 게시글을 가져옵니다.

첫번째 페이지는 first가 true, 마지막 페이지는 lsat가 true로 설정됩니다.

<h3 id="최근-글-page-단위로-조회-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer(int32)|false|none|
|size|query|integer(int32)|false|none|

> Example responses

> 200 Response

<h3 id="최근-글-page-단위로-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BoardSliceResponse](#schemaboardsliceresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## findByBoardId

<a id="opIdfindByBoardId"></a>

`GET /api/boards/Comments`

<h3 id="findbyboardid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|boardId|query|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="findbyboardid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="findbyboardid-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Comment](#schemacomment)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» content|string|false|none|none|
|» writer|[User](#schemauser)|false|none|none|
|»» createdDate|string(date-time)|false|none|none|
|»» modifiedDate|string(date-time)|false|none|none|
|»» id|integer(int64)|false|none|none|
|»» email|string|false|none|none|
|»» password|string|false|none|none|
|»» generation|integer(int32)|false|none|none|
|»» phoneNumber|string|false|none|none|
|»» githubId|string|false|none|none|
|»» discordId|string|false|none|none|
|»» username|string|false|none|none|
|»» studentId|integer(int32)|false|none|none|
|»» major|string|false|none|none|
|»» grade|integer(int32)|false|none|none|
|»» enrolled|boolean|false|none|none|
|»» authLevel|string|false|none|none|
|»» deviceId|string(uuid)|false|none|none|
|»» subscription|[Subscription](#schemasubscription)|false|none|none|
|»»» createdDate|string(date-time)|false|none|none|
|»»» modifiedDate|string(date-time)|false|none|none|
|»»» id|integer(int64)|false|none|none|
|»»» user|[User](#schemauser)|false|none|none|
|»»» fcmToken|string|false|none|none|
|»»» notice|boolean|false|none|none|
|»»» schedule|boolean|false|none|none|
|»»» vote|boolean|false|none|none|
|»»» badge|integer(int32)|false|none|none|
|» board|[Board](#schemaboard)|false|none|none|
|»» createdDate|string(date-time)|false|none|none|
|»» modifiedDate|string(date-time)|false|none|none|
|»» id|integer(int64)|false|none|none|
|»» title|string|false|none|none|
|»» content|string|false|none|none|
|»» writer|[User](#schemauser)|false|none|none|
|»» uploadFiles|[[UploadFile](#schemauploadfile)]|false|none|none|
|»»» id|integer(int64)|false|none|none|
|»»» board|[Board](#schemaboard)|false|none|none|
|»»» originalName|string|false|none|none|
|»»» saveName|string|false|none|none|
|»»» size|integer(int64)|false|none|none|
|»»» savePath|string|false|none|none|
|»» comments|[[Comment](#schemacomment)]|false|none|none|
|»» scheduleId|integer(int64)|false|none|none|
|»» subjectId|integer(int64)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|authLevel|DELETE_ACCOUNT|
|authLevel|NEW_ACCOUNT|
|authLevel|MAIL_VERIFIED|
|authLevel|STUDENT_VERIFIED|
|authLevel|MEMBER_VERIFIED|
|authLevel|ADMIN|
|authLevel|SUPER_ADMIN|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--user">User</h1>

## 세종대 학생 정보 인증

<a id="opIdupdateSejongStudentAuth"></a>

`PUT /api/users/user/{id}/sejong-auth`

해당 id 유저의 세종대 학생 정보를 인증한다.

 인증 되는 항목은 이름, 학번, 학년, 전공, 재학여부이다.

> Body parameter

```json
{
  "sejongPortalId": "string",
  "sejongPortalPassword": "string"
}
```

<h3 id="세종대-학생-정보-인증-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[SejongStudentAuthRequest](#schemasejongstudentauthrequest)|true|none|

> Example responses

> 200 Response

<h3 id="세종대-학생-정보-인증-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 전화번호 변경

<a id="opIdupdatePhoneNumber"></a>

`PUT /api/users/user/{id}/phone-number`

해당 id 유저의 전화번호를 변경한다.

> Body parameter

```json
{
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="전화번호-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[UserInfoUpdateRequest](#schemauserinfoupdaterequest)|true|none|

> Example responses

> 200 Response

<h3 id="전화번호-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 비밀번호 변경

<a id="opIdgenerateNewPassword"></a>

`PUT /api/users/user/{id}/password`

해당 id 유저의 비밀번호를 변경한다.

> Body parameter

```json
{
  "newPassword": "string"
}
```

<h3 id="비밀번호-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[UserNewPasswordRequest](#schemausernewpasswordrequest)|true|none|

> Example responses

> 200 Response

<h3 id="비밀번호-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## gitbub 아이디 변경

<a id="opIdupdateGithubAccount"></a>

`PUT /api/users/user/{id}/github-account`

해당 id 유저의 github 아이디를 변경한다.

> Body parameter

```json
{
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="gitbub-아이디-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[UserInfoUpdateRequest](#schemauserinfoupdaterequest)|true|none|

> Example responses

> 200 Response

<h3 id="gitbub-아이디-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

##  기수 변경

<a id="opIdupdateGeneration"></a>

`PUT /api/users/user/{id}/generation`

해당 id 유저의 기수를 변경한다.

> Body parameter

```json
{
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="-기수-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[UserInfoUpdateRequest](#schemauserinfoupdaterequest)|true|none|

> Example responses

> 200 Response

<h3 id="-기수-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## dicord 아이디 변경

<a id="opIdupdateDiscordAccount"></a>

`PUT /api/users/user/{id}/discord-account`

해당 id 유저의 discord 아이디를 변경한다.

> Body parameter

```json
{
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="dicord-아이디-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[UserInfoUpdateRequest](#schemauserinfoupdaterequest)|true|none|

> Example responses

> 200 Response

<h3 id="dicord-아이디-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 기기정보 변경

<a id="opIdupdateDeviceId"></a>

`PUT /api/users/user/{id}/device-id`

해당 id 유저의 device 아이디를 변경한다. device 아이디는 UUID 형식이다.

> Body parameter

```json
{
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="기기정보-변경-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|body|body|[UserInfoUpdateRequest](#schemauserinfoupdaterequest)|true|none|

> Example responses

> 200 Response

<h3 id="기기정보-변경-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 전체 유저 조회

<a id="opIdfindAllUsers"></a>

`GET /api/users`

모든 유저를 조회합니다.

> Example responses

> 200 Response

<h3 id="전체-유저-조회-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="전체-유저-조회-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[UserInfoResponse](#schemauserinforesponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» email|string|false|none|none|
|» generation|integer(int32)|false|none|none|
|» phoneNumber|string|false|none|none|
|» githubId|string|false|none|none|
|» discordId|string|false|none|none|
|» fcmToken|string|false|none|none|
|» username|string|false|none|none|
|» studentId|integer(int32)|false|none|none|
|» major|string|false|none|none|
|» grade|integer(int32)|false|none|none|
|» enrolled|boolean|false|none|none|
|» authLevel|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|authLevel|DELETE_ACCOUNT|
|authLevel|NEW_ACCOUNT|
|authLevel|MAIL_VERIFIED|
|authLevel|STUDENT_VERIFIED|
|authLevel|MEMBER_VERIFIED|
|authLevel|ADMIN|
|authLevel|SUPER_ADMIN|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 신규 유저 등록

<a id="opIdcreateUser"></a>

`POST /api/users`

신규 유저를 생성합니다.

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="신규-유저-등록-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserSignRequest](#schemausersignrequest)|true|none|

> Example responses

> 200 Response

<h3 id="신규-유저-등록-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[UserSignResponse](#schemausersignresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 간소 로그인 요청

<a id="opIdsimpleSignIn"></a>

`POST /api/users/auth/simple-sign-in`

간소 로그인, 토큰 발급용 기능

 deviceId만 전달하면 토큰 발급

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="간소-로그인-요청-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserSignRequest](#schemausersignrequest)|true|none|

> Example responses

> 200 Response

<h3 id="간소-로그인-요청-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[UserSignResponse](#schemausersignresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 로그인 요청

<a id="opIdsignIn"></a>

`POST /api/users/auth/sign-in`

로그인 요청 기능

 이메일 비밀번호는 필수

 기기 Id 안 보내면 db에 등록 안 되어서 간소 로그인 불가

> Body parameter

```json
{
  "email": "string",
  "password": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}
```

<h3 id="로그인-요청-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserSignRequest](#schemausersignrequest)|true|none|

> Example responses

> 200 Response

<h3 id="로그인-요청-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[UserSignResponse](#schemausersignresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## verifyUserAccount

<a id="opIdverifyUserAccount"></a>

`GET /api/users/verify`

<h3 id="verifyuseraccount-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|code|query|string|true|none|

> Example responses

> 200 Response

<h3 id="verifyuseraccount-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 이메일 중복 검사

<a id="opIdcheckEmailDuplication"></a>

`GET /api/users/exists`

해당 이메일이 db에 존재하는 계정인지 확인합니다.

<h3 id="이메일-중복-검사-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|email|query|string|true|none|

> Example responses

> 200 Response

<h3 id="이메일-중복-검사-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[BaseResponse](#schemabaseresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## 계정 삭제

<a id="opIddeleteUser"></a>

`DELETE /api/users/user/{id}/email/{email}`

해당하는 id와 email이 일치하는 계정 정보를 delete 상태로 변경후, 모든 데이터를 null로 변경합니다.

 pk와 레코드는 그대로 남아있습니다.

<h3 id="계정-삭제-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|
|email|path|string|true|none|

<h3 id="계정-삭제-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--notification-controller">notification-controller</h1>

## sendCustomNotification

<a id="opIdsendCustomNotification"></a>

`POST /api/fcm`

> Body parameter

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "topic": "string",
  "contentType": "string",
  "contentId": 0,
  "sendDateTime": "2019-08-24T14:15:22Z"
}
```

<h3 id="sendcustomnotification-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|query|integer(int64)|false|none|
|topic|query|string|false|none|
|token|query|string|false|none|
|body|body|[MessageRequest](#schemamessagerequest)|true|none|

<h3 id="sendcustomnotification-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## findRecentNotificationMessage

<a id="opIdfindRecentNotificationMessage"></a>

`GET /api/fcm/{userId}/Notification`

<h3 id="findrecentnotificationmessage-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="findrecentnotificationmessage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="findrecentnotificationmessage-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[MessageRequest](#schemamessagerequest)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» title|string|false|none|none|
|» body|string|false|none|none|
|» topic|string|false|none|none|
|» contentType|string|false|none|none|
|» contentId|integer(int64)|false|none|none|
|» sendDateTime|string(date-time)|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--file-provide-controller">file-provide-controller</h1>

## image 제공

<a id="opIdgetImage"></a>

`GET /image/{boardId}/{src-url}`

image 제공

<h3 id="image-제공-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|boardId|path|string|true|none|
|src-url|path|string|true|none|

> Example responses

> 200 Response

<h3 id="image-제공-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--file-controller">file-controller</h1>

## getUploadFile

<a id="opIdgetUploadFile"></a>

`GET /api/files/file/{id}`

<h3 id="getuploadfile-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="getuploadfile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[UploadFileResponse](#schemauploadfileresponse)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

## getAllUploadFiles

<a id="opIdgetAllUploadFiles"></a>

`GET /api/files/board/{id}`

<h3 id="getalluploadfiles-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer(int64)|true|none|

> Example responses

> 200 Response

<h3 id="getalluploadfiles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

<h3 id="getalluploadfiles-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[UploadFileResponse](#schemauploadfileresponse)]|false|none|none|
|» id|integer(int64)|false|none|none|
|» boardId|integer(int64)|false|none|none|
|» originalName|string|false|none|none|
|» saveName|string|false|none|none|
|» size|integer(int64)|false|none|none|
|» savePath|string|false|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

<h1 id="-api--apple-app-site-association">apple-app-site-association</h1>

## appleAppSiteAssociation

<a id="opIdappleAppSiteAssociation"></a>

`GET /.well-known/apple-app-site-association`

> Example responses

> 200 Response

```json
"string"
```

<h3 id="appleappsiteassociation-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
JWT
</aside>

# Schemas

<h2 id="tocS_VoterUpdateRequest">VoterUpdateRequest</h2>

<a id="schemavoterupdaterequest"></a>
<a id="schema_VoterUpdateRequest"></a>
<a id="tocSvoterupdaterequest"></a>
<a id="tocsvoterupdaterequest"></a>

```json
{
  "voterId": 0,
  "optionId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|voterId|integer(int64)|true|none|none|
|optionId|integer(int64)|true|none|none|

<h2 id="tocS_VoterDTO">VoterDTO</h2>

<a id="schemavoterdto"></a>
<a id="schema_VoterDTO"></a>
<a id="tocSvoterdto"></a>
<a id="tocsvoterdto"></a>

```json
{
  "voterId": 0,
  "subjectId": 0,
  "optionId": 0,
  "userId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|voterId|integer(int64)|false|none|none|
|subjectId|integer(int64)|false|none|none|
|optionId|integer(int64)|false|none|none|
|userId|integer(int64)|false|none|none|

<h2 id="tocS_SejongStudentAuthRequest">SejongStudentAuthRequest</h2>

<a id="schemasejongstudentauthrequest"></a>
<a id="schema_SejongStudentAuthRequest"></a>
<a id="tocSsejongstudentauthrequest"></a>
<a id="tocssejongstudentauthrequest"></a>

```json
{
  "sejongPortalId": "string",
  "sejongPortalPassword": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sejongPortalId|string|false|none|none|
|sejongPortalPassword|string|false|none|none|

<h2 id="tocS_Subscription">Subscription</h2>

<a id="schemasubscription"></a>
<a id="schema_Subscription"></a>
<a id="tocSsubscription"></a>
<a id="tocssubscription"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "user": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "email": "string",
    "password": "string",
    "generation": 0,
    "phoneNumber": "string",
    "githubId": "string",
    "discordId": "string",
    "username": "string",
    "studentId": 0,
    "major": "string",
    "grade": 0,
    "enrolled": true,
    "authLevel": "DELETE_ACCOUNT",
    "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
    "subscription": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "user": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "user": null,
          "fcmToken": null,
          "notice": null,
          "schedule": null,
          "vote": null,
          "badge": null
        }
      },
      "fcmToken": "string",
      "notice": true,
      "schedule": true,
      "vote": true,
      "badge": 0
    }
  },
  "fcmToken": "string",
  "notice": true,
  "schedule": true,
  "vote": true,
  "badge": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|user|[User](#schemauser)|false|none|none|
|fcmToken|string|false|none|none|
|notice|boolean|false|none|none|
|schedule|boolean|false|none|none|
|vote|boolean|false|none|none|
|badge|integer(int32)|false|none|none|

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "email": "string",
  "password": "string",
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "username": "string",
  "studentId": 0,
  "major": "string",
  "grade": 0,
  "enrolled": true,
  "authLevel": "DELETE_ACCOUNT",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
  "subscription": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "user": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "email": "string",
      "password": "string",
      "generation": 0,
      "phoneNumber": "string",
      "githubId": "string",
      "discordId": "string",
      "username": "string",
      "studentId": 0,
      "major": "string",
      "grade": 0,
      "enrolled": true,
      "authLevel": "DELETE_ACCOUNT",
      "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
      "subscription": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "user": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "email": null,
          "password": null,
          "generation": null,
          "phoneNumber": null,
          "githubId": null,
          "discordId": null,
          "username": null,
          "studentId": null,
          "major": null,
          "grade": null,
          "enrolled": null,
          "authLevel": null,
          "deviceId": null,
          "subscription": null
        },
        "fcmToken": "string",
        "notice": true,
        "schedule": true,
        "vote": true,
        "badge": 0
      }
    },
    "fcmToken": "string",
    "notice": true,
    "schedule": true,
    "vote": true,
    "badge": 0
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|email|string|false|none|none|
|password|string|false|none|none|
|generation|integer(int32)|false|none|none|
|phoneNumber|string|false|none|none|
|githubId|string|false|none|none|
|discordId|string|false|none|none|
|username|string|false|none|none|
|studentId|integer(int32)|false|none|none|
|major|string|false|none|none|
|grade|integer(int32)|false|none|none|
|enrolled|boolean|false|none|none|
|authLevel|string|false|none|none|
|deviceId|string(uuid)|false|none|none|
|subscription|[Subscription](#schemasubscription)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|authLevel|DELETE_ACCOUNT|
|authLevel|NEW_ACCOUNT|
|authLevel|MAIL_VERIFIED|
|authLevel|STUDENT_VERIFIED|
|authLevel|MEMBER_VERIFIED|
|authLevel|ADMIN|
|authLevel|SUPER_ADMIN|

<h2 id="tocS_UserInfoUpdateRequest">UserInfoUpdateRequest</h2>

<a id="schemauserinfoupdaterequest"></a>
<a id="schema_UserInfoUpdateRequest"></a>
<a id="tocSuserinfoupdaterequest"></a>
<a id="tocsuserinfoupdaterequest"></a>

```json
{
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|generation|integer(int32)|false|none|none|
|phoneNumber|string|false|none|none|
|githubId|string|false|none|none|
|discordId|string|false|none|none|
|fcmToken|string|false|none|none|
|deviceId|string(uuid)|false|none|none|

<h2 id="tocS_UserNewPasswordRequest">UserNewPasswordRequest</h2>

<a id="schemausernewpasswordrequest"></a>
<a id="schema_UserNewPasswordRequest"></a>
<a id="tocSusernewpasswordrequest"></a>
<a id="tocsusernewpasswordrequest"></a>

```json
{
  "newPassword": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|newPassword|string|false|none|none|

<h2 id="tocS_BoardRequest">BoardRequest</h2>

<a id="schemaboardrequest"></a>
<a id="schema_BoardRequest"></a>
<a id="tocSboardrequest"></a>
<a id="tocsboardrequest"></a>

```json
{
  "title": "string",
  "content": "string",
  "userId": 0,
  "scheduleId": 0,
  "subjectId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|content|string|false|none|none|
|userId|integer(int64)|false|none|none|
|scheduleId|integer(int64)|false|none|none|
|subjectId|integer(int64)|false|none|none|

<h2 id="tocS_BoardResponse">BoardResponse</h2>

<a id="schemaboardresponse"></a>
<a id="schema_BoardResponse"></a>
<a id="tocSboardresponse"></a>
<a id="tocsboardresponse"></a>

```json
{
  "id": 0,
  "title": "string",
  "content": "string",
  "userId": 0,
  "scheduleId": 0,
  "subjectId": 0,
  "createDate": "2019-08-24T14:15:22Z",
  "updateDate": "2019-08-24T14:15:22Z",
  "fileNames": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|title|string|false|none|none|
|content|string|false|none|none|
|userId|integer(int64)|false|none|none|
|scheduleId|integer(int64)|false|none|none|
|subjectId|integer(int64)|false|none|none|
|createDate|string(date-time)|false|none|none|
|updateDate|string(date-time)|false|none|none|
|fileNames|[string]|false|none|none|

<h2 id="tocS_OptionRequest">OptionRequest</h2>

<a id="schemaoptionrequest"></a>
<a id="schema_OptionRequest"></a>
<a id="tocSoptionrequest"></a>
<a id="tocsoptionrequest"></a>

```json
{
  "option": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|option|string|false|none|none|

<h2 id="tocS_SubjectRequest">SubjectRequest</h2>

<a id="schemasubjectrequest"></a>
<a id="schema_SubjectRequest"></a>
<a id="tocSsubjectrequest"></a>
<a id="tocssubjectrequest"></a>

```json
{
  "subject": "string",
  "startDateTime": "2019-08-24T14:15:22Z",
  "endDateTime": "2019-08-24T14:15:22Z",
  "options": [
    {
      "option": "string"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subject|string|false|none|none|
|startDateTime|string(date-time)|false|none|none|
|endDateTime|string(date-time)|false|none|none|
|options|[[OptionRequest](#schemaoptionrequest)]|false|none|none|

<h2 id="tocS_CreateResponse">CreateResponse</h2>

<a id="schemacreateresponse"></a>
<a id="schema_CreateResponse"></a>
<a id="tocScreateresponse"></a>
<a id="tocscreateresponse"></a>

```json
{
  "subject": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "subject": "string",
    "startDateTime": "2019-08-24T14:15:22Z",
    "endDateTime": "2019-08-24T14:15:22Z",
    "total": 0,
    "voteOptions": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "option": "string",
        "count": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      }
    ],
    "voteVoters": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteOption": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "option": "string",
          "count": 0,
          "voteSubject": {},
          "voteVoters": [
            null
          ]
        },
        "user": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        }
      }
    ]
  },
  "options": [
    {
      "optionId": 0,
      "option": "string",
      "count": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subject|[VoteSubject](#schemavotesubject)|false|none|none|
|options|[[OptionDTO](#schemaoptiondto)]|false|none|none|

<h2 id="tocS_OptionDTO">OptionDTO</h2>

<a id="schemaoptiondto"></a>
<a id="schema_OptionDTO"></a>
<a id="tocSoptiondto"></a>
<a id="tocsoptiondto"></a>

```json
{
  "optionId": 0,
  "option": "string",
  "count": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|optionId|integer(int64)|false|none|none|
|option|string|false|none|none|
|count|integer(int32)|false|none|none|

<h2 id="tocS_VoteOption">VoteOption</h2>

<a id="schemavoteoption"></a>
<a id="schema_VoteOption"></a>
<a id="tocSvoteoption"></a>
<a id="tocsvoteoption"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "option": "string",
  "count": 0,
  "voteSubject": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "subject": "string",
    "startDateTime": "2019-08-24T14:15:22Z",
    "endDateTime": "2019-08-24T14:15:22Z",
    "total": 0,
    "voteOptions": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "option": "string",
        "count": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      }
    ],
    "voteVoters": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteOption": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "option": "string",
          "count": 0,
          "voteSubject": {},
          "voteVoters": [
            null
          ]
        },
        "user": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        }
      }
    ]
  },
  "voteVoters": [
    {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "voteSubject": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "subject": "string",
        "startDateTime": "2019-08-24T14:15:22Z",
        "endDateTime": "2019-08-24T14:15:22Z",
        "total": 0,
        "voteOptions": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "option": null,
            "count": null,
            "voteSubject": null,
            "voteVoters": null
          }
        ],
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      },
      "voteOption": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "option": "string",
        "count": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      },
      "user": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "user": {},
          "fcmToken": "string",
          "notice": true,
          "schedule": true,
          "vote": true,
          "badge": 0
        }
      }
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|option|string|false|none|none|
|count|integer(int32)|false|none|none|
|voteSubject|[VoteSubject](#schemavotesubject)|false|none|none|
|voteVoters|[[VoteVoter](#schemavotevoter)]|false|none|none|

<h2 id="tocS_VoteSubject">VoteSubject</h2>

<a id="schemavotesubject"></a>
<a id="schema_VoteSubject"></a>
<a id="tocSvotesubject"></a>
<a id="tocsvotesubject"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "subject": "string",
  "startDateTime": "2019-08-24T14:15:22Z",
  "endDateTime": "2019-08-24T14:15:22Z",
  "total": 0,
  "voteOptions": [
    {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "option": "string",
      "count": 0,
      "voteSubject": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "subject": "string",
        "startDateTime": "2019-08-24T14:15:22Z",
        "endDateTime": "2019-08-24T14:15:22Z",
        "total": 0,
        "voteOptions": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "option": null,
            "count": null,
            "voteSubject": null,
            "voteVoters": null
          }
        ],
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      },
      "voteVoters": [
        {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "voteSubject": {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "subject": null,
            "startDateTime": null,
            "endDateTime": null,
            "total": null,
            "voteOptions": null,
            "voteVoters": null
          },
          "voteOption": {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "option": null,
            "count": null,
            "voteSubject": null,
            "voteVoters": null
          },
          "user": {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "email": null,
            "password": null,
            "generation": null,
            "phoneNumber": null,
            "githubId": null,
            "discordId": null,
            "username": null,
            "studentId": null,
            "major": null,
            "grade": null,
            "enrolled": null,
            "authLevel": null,
            "deviceId": null,
            "subscription": null
          }
        }
      ]
    }
  ],
  "voteVoters": [
    {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "voteSubject": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "subject": "string",
        "startDateTime": "2019-08-24T14:15:22Z",
        "endDateTime": "2019-08-24T14:15:22Z",
        "total": 0,
        "voteOptions": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "option": null,
            "count": null,
            "voteSubject": null,
            "voteVoters": null
          }
        ],
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      },
      "voteOption": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "option": "string",
        "count": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      },
      "user": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "user": {},
          "fcmToken": "string",
          "notice": true,
          "schedule": true,
          "vote": true,
          "badge": 0
        }
      }
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|subject|string|false|none|none|
|startDateTime|string(date-time)|false|none|none|
|endDateTime|string(date-time)|false|none|none|
|total|integer(int32)|false|none|none|
|voteOptions|[[VoteOption](#schemavoteoption)]|false|none|none|
|voteVoters|[[VoteVoter](#schemavotevoter)]|false|none|none|

<h2 id="tocS_VoteVoter">VoteVoter</h2>

<a id="schemavotevoter"></a>
<a id="schema_VoteVoter"></a>
<a id="tocSvotevoter"></a>
<a id="tocsvotevoter"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "voteSubject": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "subject": "string",
    "startDateTime": "2019-08-24T14:15:22Z",
    "endDateTime": "2019-08-24T14:15:22Z",
    "total": 0,
    "voteOptions": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "option": "string",
        "count": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteVoters": [
          {
            "createdDate": null,
            "modifiedDate": null,
            "id": null,
            "voteSubject": null,
            "voteOption": null,
            "user": null
          }
        ]
      }
    ],
    "voteVoters": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteOption": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "option": "string",
          "count": 0,
          "voteSubject": {},
          "voteVoters": [
            null
          ]
        },
        "user": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        }
      }
    ]
  },
  "voteOption": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "option": "string",
    "count": 0,
    "voteSubject": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "subject": "string",
      "startDateTime": "2019-08-24T14:15:22Z",
      "endDateTime": "2019-08-24T14:15:22Z",
      "total": 0,
      "voteOptions": [
        {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "option": "string",
          "count": 0,
          "voteSubject": {},
          "voteVoters": [
            null
          ]
        }
      ],
      "voteVoters": [
        {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "voteSubject": {},
          "voteOption": {},
          "user": {}
        }
      ]
    },
    "voteVoters": [
      {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "voteSubject": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "subject": "string",
          "startDateTime": "2019-08-24T14:15:22Z",
          "endDateTime": "2019-08-24T14:15:22Z",
          "total": 0,
          "voteOptions": [
            null
          ],
          "voteVoters": [
            null
          ]
        },
        "voteOption": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "option": "string",
          "count": 0,
          "voteSubject": {},
          "voteVoters": [
            null
          ]
        },
        "user": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        }
      }
    ]
  },
  "user": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "email": "string",
    "password": "string",
    "generation": 0,
    "phoneNumber": "string",
    "githubId": "string",
    "discordId": "string",
    "username": "string",
    "studentId": 0,
    "major": "string",
    "grade": 0,
    "enrolled": true,
    "authLevel": "DELETE_ACCOUNT",
    "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
    "subscription": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "user": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "user": null,
          "fcmToken": null,
          "notice": null,
          "schedule": null,
          "vote": null,
          "badge": null
        }
      },
      "fcmToken": "string",
      "notice": true,
      "schedule": true,
      "vote": true,
      "badge": 0
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|voteSubject|[VoteSubject](#schemavotesubject)|false|none|none|
|voteOption|[VoteOption](#schemavoteoption)|false|none|none|
|user|[User](#schemauser)|false|none|none|

<h2 id="tocS_UserSignRequest">UserSignRequest</h2>

<a id="schemausersignrequest"></a>
<a id="schema_UserSignRequest"></a>
<a id="tocSusersignrequest"></a>
<a id="tocsusersignrequest"></a>

```json
{
  "email": "string",
  "password": "string",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|
|deviceId|string(uuid)|false|none|none|

<h2 id="tocS_UserSignResponse">UserSignResponse</h2>

<a id="schemausersignresponse"></a>
<a id="schema_UserSignResponse"></a>
<a id="tocSusersignresponse"></a>
<a id="tocsusersignresponse"></a>

```json
{
  "id": 0,
  "email": "string",
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "username": "string",
  "studentId": 0,
  "major": "string",
  "grade": 0,
  "enrolled": true,
  "authLevel": "DELETE_ACCOUNT",
  "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|email|string|false|none|none|
|generation|integer(int32)|false|none|none|
|phoneNumber|string|false|none|none|
|githubId|string|false|none|none|
|discordId|string|false|none|none|
|username|string|false|none|none|
|studentId|integer(int32)|false|none|none|
|major|string|false|none|none|
|grade|integer(int32)|false|none|none|
|enrolled|boolean|false|none|none|
|authLevel|string|false|none|none|
|deviceId|string(uuid)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|authLevel|DELETE_ACCOUNT|
|authLevel|NEW_ACCOUNT|
|authLevel|MAIL_VERIFIED|
|authLevel|STUDENT_VERIFIED|
|authLevel|MEMBER_VERIFIED|
|authLevel|ADMIN|
|authLevel|SUPER_ADMIN|

<h2 id="tocS_BaseExceptionResponse">BaseExceptionResponse</h2>

<a id="schemabaseexceptionresponse"></a>
<a id="schema_BaseExceptionResponse"></a>
<a id="tocSbaseexceptionresponse"></a>
<a id="tocsbaseexceptionresponse"></a>

```json
{
  "exception": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|exception|string|false|none|none|

<h2 id="tocS_SubscriptionRequest">SubscriptionRequest</h2>

<a id="schemasubscriptionrequest"></a>
<a id="schema_SubscriptionRequest"></a>
<a id="tocSsubscriptionrequest"></a>
<a id="tocssubscriptionrequest"></a>

```json
{
  "fcmToken": "string",
  "notice": true,
  "schedule": true,
  "vote": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|fcmToken|string|false|none|none|
|notice|boolean|false|none|none|
|schedule|boolean|false|none|none|
|vote|boolean|false|none|none|

<h2 id="tocS_SubscriptionResponse">SubscriptionResponse</h2>

<a id="schemasubscriptionresponse"></a>
<a id="schema_SubscriptionResponse"></a>
<a id="tocSsubscriptionresponse"></a>
<a id="tocssubscriptionresponse"></a>

```json
{
  "id": 0,
  "fcmToken": "string",
  "notice": true,
  "schedule": true,
  "vote": true,
  "badge": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|fcmToken|string|false|none|none|
|notice|boolean|false|none|none|
|schedule|boolean|false|none|none|
|vote|boolean|false|none|none|
|badge|integer(int32)|false|none|none|

<h2 id="tocS_ScheduleRequest">ScheduleRequest</h2>

<a id="schemaschedulerequest"></a>
<a id="schema_ScheduleRequest"></a>
<a id="tocSschedulerequest"></a>
<a id="tocsschedulerequest"></a>

```json
{
  "title": "string",
  "description": "string",
  "startDate": "2019-08-24T14:15:22Z",
  "endDate": "2019-08-24T14:15:22Z",
  "allDay": true,
  "type": "GROUP"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|description|string|false|none|none|
|startDate|string(date-time)|false|none|none|
|endDate|string(date-time)|false|none|none|
|allDay|boolean|false|none|none|
|type|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|GROUP|
|type|ACADEMIC|
|type|ETC|

<h2 id="tocS_Schedule">Schedule</h2>

<a id="schemaschedule"></a>
<a id="schema_Schedule"></a>
<a id="tocSschedule"></a>
<a id="tocsschedule"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "title": "string",
  "description": "string",
  "startDate": "2019-08-24T14:15:22Z",
  "endDate": "2019-08-24T14:15:22Z",
  "allDay": true,
  "type": "GROUP",
  "boardId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|title|string|true|none|none|
|description|string|false|none|none|
|startDate|string(date-time)|false|none|none|
|endDate|string(date-time)|false|none|none|
|allDay|boolean|false|none|none|
|type|string|false|none|none|
|boardId|integer(int64)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|GROUP|
|type|ACADEMIC|
|type|ETC|

<h2 id="tocS_MessageRequest">MessageRequest</h2>

<a id="schemamessagerequest"></a>
<a id="schema_MessageRequest"></a>
<a id="tocSmessagerequest"></a>
<a id="tocsmessagerequest"></a>

```json
{
  "id": 0,
  "title": "string",
  "body": "string",
  "topic": "string",
  "contentType": "string",
  "contentId": 0,
  "sendDateTime": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|title|string|false|none|none|
|body|string|false|none|none|
|topic|string|false|none|none|
|contentType|string|false|none|none|
|contentId|integer(int64)|false|none|none|
|sendDateTime|string(date-time)|false|none|none|

<h2 id="tocS_Board">Board</h2>

<a id="schemaboard"></a>
<a id="schema_Board"></a>
<a id="tocSboard"></a>
<a id="tocsboard"></a>

```json
{
  "createdDate": "2019-08-24T14:15:22Z",
  "modifiedDate": "2019-08-24T14:15:22Z",
  "id": 0,
  "title": "string",
  "content": "string",
  "writer": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "email": "string",
    "password": "string",
    "generation": 0,
    "phoneNumber": "string",
    "githubId": "string",
    "discordId": "string",
    "username": "string",
    "studentId": 0,
    "major": "string",
    "grade": 0,
    "enrolled": true,
    "authLevel": "DELETE_ACCOUNT",
    "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
    "subscription": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "user": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "user": null,
          "fcmToken": null,
          "notice": null,
          "schedule": null,
          "vote": null,
          "badge": null
        }
      },
      "fcmToken": "string",
      "notice": true,
      "schedule": true,
      "vote": true,
      "badge": 0
    }
  },
  "uploadFiles": [
    {
      "id": 0,
      "board": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "title": "string",
        "content": "string",
        "writer": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        },
        "uploadFiles": [
          {
            "id": null,
            "board": null,
            "originalName": null,
            "saveName": null,
            "size": null,
            "savePath": null
          }
        ],
        "comments": [
          {
            "id": null,
            "content": null,
            "writer": null,
            "board": null
          }
        ],
        "scheduleId": 0,
        "subjectId": 0
      },
      "originalName": "string",
      "saveName": "string",
      "size": 0,
      "savePath": "string"
    }
  ],
  "comments": [
    {
      "id": 0,
      "content": "string",
      "writer": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "user": {},
          "fcmToken": "string",
          "notice": true,
          "schedule": true,
          "vote": true,
          "badge": 0
        }
      },
      "board": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "title": "string",
        "content": "string",
        "writer": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        },
        "uploadFiles": [
          {
            "id": null,
            "board": null,
            "originalName": null,
            "saveName": null,
            "size": null,
            "savePath": null
          }
        ],
        "comments": [
          {
            "id": null,
            "content": null,
            "writer": null,
            "board": null
          }
        ],
        "scheduleId": 0,
        "subjectId": 0
      }
    }
  ],
  "scheduleId": 0,
  "subjectId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdDate|string(date-time)|false|none|none|
|modifiedDate|string(date-time)|false|none|none|
|id|integer(int64)|false|none|none|
|title|string|false|none|none|
|content|string|false|none|none|
|writer|[User](#schemauser)|false|none|none|
|uploadFiles|[[UploadFile](#schemauploadfile)]|false|none|none|
|comments|[[Comment](#schemacomment)]|false|none|none|
|scheduleId|integer(int64)|false|none|none|
|subjectId|integer(int64)|false|none|none|

<h2 id="tocS_Comment">Comment</h2>

<a id="schemacomment"></a>
<a id="schema_Comment"></a>
<a id="tocScomment"></a>
<a id="tocscomment"></a>

```json
{
  "id": 0,
  "content": "string",
  "writer": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "email": "string",
    "password": "string",
    "generation": 0,
    "phoneNumber": "string",
    "githubId": "string",
    "discordId": "string",
    "username": "string",
    "studentId": 0,
    "major": "string",
    "grade": 0,
    "enrolled": true,
    "authLevel": "DELETE_ACCOUNT",
    "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
    "subscription": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "user": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "email": "string",
        "password": "string",
        "generation": 0,
        "phoneNumber": "string",
        "githubId": "string",
        "discordId": "string",
        "username": "string",
        "studentId": 0,
        "major": "string",
        "grade": 0,
        "enrolled": true,
        "authLevel": "DELETE_ACCOUNT",
        "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
        "subscription": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "user": null,
          "fcmToken": null,
          "notice": null,
          "schedule": null,
          "vote": null,
          "badge": null
        }
      },
      "fcmToken": "string",
      "notice": true,
      "schedule": true,
      "vote": true,
      "badge": 0
    }
  },
  "board": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "title": "string",
    "content": "string",
    "writer": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "email": "string",
      "password": "string",
      "generation": 0,
      "phoneNumber": "string",
      "githubId": "string",
      "discordId": "string",
      "username": "string",
      "studentId": 0,
      "major": "string",
      "grade": 0,
      "enrolled": true,
      "authLevel": "DELETE_ACCOUNT",
      "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
      "subscription": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "user": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "email": null,
          "password": null,
          "generation": null,
          "phoneNumber": null,
          "githubId": null,
          "discordId": null,
          "username": null,
          "studentId": null,
          "major": null,
          "grade": null,
          "enrolled": null,
          "authLevel": null,
          "deviceId": null,
          "subscription": null
        },
        "fcmToken": "string",
        "notice": true,
        "schedule": true,
        "vote": true,
        "badge": 0
      }
    },
    "uploadFiles": [
      {
        "id": 0,
        "board": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "title": "string",
          "content": "string",
          "writer": {},
          "uploadFiles": [
            null
          ],
          "comments": [
            null
          ],
          "scheduleId": 0,
          "subjectId": 0
        },
        "originalName": "string",
        "saveName": "string",
        "size": 0,
        "savePath": "string"
      }
    ],
    "comments": [
      {
        "id": 0,
        "content": "string",
        "writer": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        },
        "board": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "title": "string",
          "content": "string",
          "writer": {},
          "uploadFiles": [
            null
          ],
          "comments": [
            null
          ],
          "scheduleId": 0,
          "subjectId": 0
        }
      }
    ],
    "scheduleId": 0,
    "subjectId": 0
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|content|string|false|none|none|
|writer|[User](#schemauser)|false|none|none|
|board|[Board](#schemaboard)|false|none|none|

<h2 id="tocS_UploadFile">UploadFile</h2>

<a id="schemauploadfile"></a>
<a id="schema_UploadFile"></a>
<a id="tocSuploadfile"></a>
<a id="tocsuploadfile"></a>

```json
{
  "id": 0,
  "board": {
    "createdDate": "2019-08-24T14:15:22Z",
    "modifiedDate": "2019-08-24T14:15:22Z",
    "id": 0,
    "title": "string",
    "content": "string",
    "writer": {
      "createdDate": "2019-08-24T14:15:22Z",
      "modifiedDate": "2019-08-24T14:15:22Z",
      "id": 0,
      "email": "string",
      "password": "string",
      "generation": 0,
      "phoneNumber": "string",
      "githubId": "string",
      "discordId": "string",
      "username": "string",
      "studentId": 0,
      "major": "string",
      "grade": 0,
      "enrolled": true,
      "authLevel": "DELETE_ACCOUNT",
      "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
      "subscription": {
        "createdDate": "2019-08-24T14:15:22Z",
        "modifiedDate": "2019-08-24T14:15:22Z",
        "id": 0,
        "user": {
          "createdDate": null,
          "modifiedDate": null,
          "id": null,
          "email": null,
          "password": null,
          "generation": null,
          "phoneNumber": null,
          "githubId": null,
          "discordId": null,
          "username": null,
          "studentId": null,
          "major": null,
          "grade": null,
          "enrolled": null,
          "authLevel": null,
          "deviceId": null,
          "subscription": null
        },
        "fcmToken": "string",
        "notice": true,
        "schedule": true,
        "vote": true,
        "badge": 0
      }
    },
    "uploadFiles": [
      {
        "id": 0,
        "board": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "title": "string",
          "content": "string",
          "writer": {},
          "uploadFiles": [
            null
          ],
          "comments": [
            null
          ],
          "scheduleId": 0,
          "subjectId": 0
        },
        "originalName": "string",
        "saveName": "string",
        "size": 0,
        "savePath": "string"
      }
    ],
    "comments": [
      {
        "id": 0,
        "content": "string",
        "writer": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "email": "string",
          "password": "string",
          "generation": 0,
          "phoneNumber": "string",
          "githubId": "string",
          "discordId": "string",
          "username": "string",
          "studentId": 0,
          "major": "string",
          "grade": 0,
          "enrolled": true,
          "authLevel": "[",
          "deviceId": "4de4adb9-21ee-47e3-aeb4-8cf8ed6c109a",
          "subscription": {}
        },
        "board": {
          "createdDate": "2019-08-24T14:15:22Z",
          "modifiedDate": "2019-08-24T14:15:22Z",
          "id": 0,
          "title": "string",
          "content": "string",
          "writer": {},
          "uploadFiles": [
            null
          ],
          "comments": [
            null
          ],
          "scheduleId": 0,
          "subjectId": 0
        }
      }
    ],
    "scheduleId": 0,
    "subjectId": 0
  },
  "originalName": "string",
  "saveName": "string",
  "size": 0,
  "savePath": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|board|[Board](#schemaboard)|false|none|none|
|originalName|string|false|none|none|
|saveName|string|false|none|none|
|size|integer(int64)|false|none|none|
|savePath|string|false|none|none|

<h2 id="tocS_SubjectResponse">SubjectResponse</h2>

<a id="schemasubjectresponse"></a>
<a id="schema_SubjectResponse"></a>
<a id="tocSsubjectresponse"></a>
<a id="tocssubjectresponse"></a>

```json
{
  "subjectId": 0,
  "subject": "string",
  "startDate": "2019-08-24T14:15:22Z",
  "endDate": "2019-08-24T14:15:22Z",
  "total": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subjectId|integer(int64)|false|none|none|
|subject|string|false|none|none|
|startDate|string(date-time)|false|none|none|
|endDate|string(date-time)|false|none|none|
|total|integer(int32)|false|none|none|

<h2 id="tocS_OptionResponse">OptionResponse</h2>

<a id="schemaoptionresponse"></a>
<a id="schema_OptionResponse"></a>
<a id="tocSoptionresponse"></a>
<a id="tocsoptionresponse"></a>

```json
{
  "subject": "string",
  "startDateTime": "2019-08-24T14:15:22Z",
  "endDateTime": "2019-08-24T14:15:22Z",
  "options": [
    {
      "optionId": 0,
      "option": "string",
      "count": 0
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subject|string|false|none|none|
|startDateTime|string(date-time)|false|none|none|
|endDateTime|string(date-time)|false|none|none|
|options|[[OptionDTO](#schemaoptiondto)]|false|none|none|

<h2 id="tocS_UserInfoResponse">UserInfoResponse</h2>

<a id="schemauserinforesponse"></a>
<a id="schema_UserInfoResponse"></a>
<a id="tocSuserinforesponse"></a>
<a id="tocsuserinforesponse"></a>

```json
{
  "id": 0,
  "email": "string",
  "generation": 0,
  "phoneNumber": "string",
  "githubId": "string",
  "discordId": "string",
  "fcmToken": "string",
  "username": "string",
  "studentId": 0,
  "major": "string",
  "grade": 0,
  "enrolled": true,
  "authLevel": "DELETE_ACCOUNT"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|email|string|false|none|none|
|generation|integer(int32)|false|none|none|
|phoneNumber|string|false|none|none|
|githubId|string|false|none|none|
|discordId|string|false|none|none|
|fcmToken|string|false|none|none|
|username|string|false|none|none|
|studentId|integer(int32)|false|none|none|
|major|string|false|none|none|
|grade|integer(int32)|false|none|none|
|enrolled|boolean|false|none|none|
|authLevel|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|authLevel|DELETE_ACCOUNT|
|authLevel|NEW_ACCOUNT|
|authLevel|MAIL_VERIFIED|
|authLevel|STUDENT_VERIFIED|
|authLevel|MEMBER_VERIFIED|
|authLevel|ADMIN|
|authLevel|SUPER_ADMIN|

<h2 id="tocS_BaseResponse">BaseResponse</h2>

<a id="schemabaseresponse"></a>
<a id="schema_BaseResponse"></a>
<a id="tocSbaseresponse"></a>
<a id="tocsbaseresponse"></a>

```json
{
  "response": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|response|string|false|none|none|

<h2 id="tocS_ScheduleResponse">ScheduleResponse</h2>

<a id="schemascheduleresponse"></a>
<a id="schema_ScheduleResponse"></a>
<a id="tocSscheduleresponse"></a>
<a id="tocsscheduleresponse"></a>

```json
{
  "id": 0,
  "title": "string",
  "description": "string",
  "startDate": "2019-08-24T14:15:22Z",
  "endDate": "2019-08-24T14:15:22Z",
  "allDay": true,
  "type": "GROUP",
  "boardId": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|title|string|false|none|none|
|description|string|false|none|none|
|startDate|string(date-time)|false|none|none|
|endDate|string(date-time)|false|none|none|
|allDay|boolean|false|none|none|
|type|string|false|none|none|
|boardId|integer(int64)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|GROUP|
|type|ACADEMIC|
|type|ETC|

<h2 id="tocS_UploadFileResponse">UploadFileResponse</h2>

<a id="schemauploadfileresponse"></a>
<a id="schema_UploadFileResponse"></a>
<a id="tocSuploadfileresponse"></a>
<a id="tocsuploadfileresponse"></a>

```json
{
  "id": 0,
  "boardId": 0,
  "originalName": "string",
  "saveName": "string",
  "size": 0,
  "savePath": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|none|
|boardId|integer(int64)|false|none|none|
|originalName|string|false|none|none|
|saveName|string|false|none|none|
|size|integer(int64)|false|none|none|
|savePath|string|false|none|none|

<h2 id="tocS_TitleDto">TitleDto</h2>

<a id="schematitledto"></a>
<a id="schema_TitleDto"></a>
<a id="tocStitledto"></a>
<a id="tocstitledto"></a>

```json
{
  "title": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|

<h2 id="tocS_BoardSliceResponse">BoardSliceResponse</h2>

<a id="schemaboardsliceresponse"></a>
<a id="schema_BoardSliceResponse"></a>
<a id="tocSboardsliceresponse"></a>
<a id="tocsboardsliceresponse"></a>

```json
{
  "boardResponses": [
    {
      "id": 0,
      "title": "string",
      "content": "string",
      "userId": 0,
      "scheduleId": 0,
      "subjectId": 0,
      "createDate": "2019-08-24T14:15:22Z",
      "updateDate": "2019-08-24T14:15:22Z",
      "fileNames": [
        "string"
      ]
    }
  ],
  "first": true,
  "last": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|boardResponses|[[BoardResponse](#schemaboardresponse)]|false|none|none|
|first|boolean|false|none|none|
|last|boolean|false|none|none|

