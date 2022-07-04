import {AxiosResponse} from "axios";
import Record from "./Record";

type ReadResponse = {
    status: string,
    content: Record[]
}

function loadRecords(requestUrl: string, offsetIds: number[], setOffsetIds: (offsetIds: number[]) => void,
                     setNextDisabled: (nextDisabled: boolean) => void, setRecords: (records: Record[]) => void): void {
    const lastIndex = offsetIds.length - 1;

    if (lastIndex >= 0) {
        const lastOffsetId = offsetIds[lastIndex];

        requestUrl = `${requestUrl}?offsetId=${lastOffsetId}`;
    } //end if

    const config = {
        "withCredentials": true
    };

    const axios = require("axios").default;

    axios.get(requestUrl, config)
         .then((response: AxiosResponse<ReadResponse>) => {
             if (response.data.status !== "SUCCESS") {
                 return;
             } //end if

             const content = response.data.content;

             const expectedLength = 10;

             const recordCount = parseInt(response.headers["x-record-count"]);

             const nextDisabled = (content.length !== expectedLength) || ((offsetIds.length * 10) === recordCount);

             setNextDisabled(nextDisabled);

             const lastIndex = content.length - 1;

             const offsetIdsCopy = [...offsetIds];

             if (lastIndex >= 0) {
                 let offsetId = content[lastIndex].id;

                 offsetIdsCopy.push(offsetId);

                 setOffsetIds(offsetIdsCopy);
             } //end if

             setRecords(content);
         });
} //loadRecords

export default loadRecords;