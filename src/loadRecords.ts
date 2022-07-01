import {AxiosResponse} from "axios";
import Record from "./Record";

type ReadResponse = {
    status: string,
    content: Record[]
}

function loadRecords(requestUrl: string, offsetId: number | null, setOffsetId: Function, records: Record[],
                     setRecords: Function): void {
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

             if (content.length === 0) {
                 setOffsetId(null);
             } else {
                 const lastIndex = content.length - 1;

                 const offsetId = content[lastIndex].id;

                 setOffsetId(offsetId);
             } //end if

             let newRecords = [...records];

             newRecords.push(...content);

             setRecords(newRecords);
         });
} //loadRecords

export default loadRecords;