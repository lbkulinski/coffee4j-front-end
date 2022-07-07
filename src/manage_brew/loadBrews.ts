import {AxiosResponse} from "axios";
import Brew from "./Brew";

type ReadResponse = {
    status: string,
    content: Brew[]
}

function loadBrews(offsetIds: number[], setOffsetIds: (offsetIds: number[]) => void,
                   setNextDisabled: (nextDisabled: boolean) => void, setBrews: (brews: Brew[]) => void): void {
    const lastIndex = offsetIds.length - 1;

    let requestUrl = "/api/brew";

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
                 const offsetId = content[lastIndex].id;

                 offsetIdsCopy.push(offsetId);

                 setOffsetIds(offsetIdsCopy);
             } //end if

             setBrews(content);
         });
} //loadBrews

export default loadBrews;