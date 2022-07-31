import {AxiosResponse, default as axios} from "axios";
import Brew from "./Brew";

interface ReadResponse {
    status: string,
    content: Brew[]
}

function loadBrews(offsetId?: number): Promise<Brew[]> {
    return new Promise<Brew[]>((resolve) => {
        let requestUrl = "/api/brew";

        if (offsetId !== undefined) {
            requestUrl = `${requestUrl}?offsetId=${offsetId}`;
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

                 resolve(content);

                 /*
                 const expectedLength = 10;

                 const recordCount = parseInt(response.headers["x-record-count"]);

                 const nextDisabled = (content.length !== expectedLength) || ((offsetIds.length * 10) === recordCount);

                 setNextDisabled(nextDisabled);

                 const lastIndex = content.length - 1;

                 const offsetIdsCopy = [...offsetIds];

                 if (lastIndex >= 0) {
                     const offsetId = content[lastIndex].id;

                     offsetIdsCopy.push(offsetId);

                     setOffsetIds(offsetIdsCopy);
                 } //end if

                 setBrews(content);
                  */
             });
    });
} //loadBrews

export default loadBrews;