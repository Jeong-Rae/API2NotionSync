const axios = require("axios");

const token = "secret_xm5CmdMZQfkW35nk7NA7sy78shS4XewVcLjc6kfmCfG";
const pageId = "9dbcf85f5ff540a2b3ee0a6a5ee6d2cc";

axios
    .get(`https://api.notion.com/v1/blocks/${pageId}/children`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Notion-Version": "2022-06-28",
        },
    })
    .then((response) => {
        console.log(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
        console.error(error);
    });
