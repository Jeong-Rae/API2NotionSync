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
