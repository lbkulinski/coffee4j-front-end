import {AxiosResponse} from "axios";
import Record from "./Record";

type ReadResponse = {
    status: string,
    content: Record[]
}

function loadRecords(requestUrl: string, page: number, setPageCount: Function, setRecords: Function): void {
    requestUrl = `${requestUrl}?page=${page}`;

    let config = {
        "withCredentials": true
    };

    const axios = require("axios").default;

    axios.get(requestUrl, config)
         .then((response: AxiosResponse<ReadResponse>) => {
             if (response.data.status !== "SUCCESS") {
                 return;
             } //end if

             let pageCountString = response.headers["page-count"];

             if (!pageCountString) {
                 return;
             } //end if

             let pageCount = parseInt(pageCountString);

             setPageCount(pageCount);

             let content = response.data.content;

             setRecords(content);
         });
} //loadRecords

export default loadRecords;