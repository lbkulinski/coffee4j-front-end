import {AxiosResponse, default as axios} from "axios";
import RecordType from "../manage_record/RecordType";

interface Option {
    value: string,
    label: string,
    __isNew__: boolean
}

interface Result {
    id: number,
    name: string
}

interface ReadResponse {
    status: string,
    content: Result[]
}

function loadOptions(type: RecordType, searchTerm: string): Promise<Option[]> {
    const typeString = type.toLowerCase();

    let requestUrl = `/api/typeahead/${typeString}?searchTerm=${searchTerm}`;

    const config = {
        "withCredentials": true
    };

    const axios = require("axios").default;

    return new Promise<Option[]>((resolve) => {
        axios.get(requestUrl, config)
             .then((response: AxiosResponse<ReadResponse>) => {
                 if (response.data.status !== "SUCCESS") {
                     resolve([]);

                     return;
                 } //end if

                 const results = response.data.content;

                 const options: Option[] = [];

                 results.forEach((result: Result) => {
                     let value = String(result.id);

                     const option: Option = {
                         "value": value,
                         "label": result.name,
                         "__isNew__": false
                     };

                     options.push(option);
                 });

                 resolve(options);
             });
    });
} //loadOptions

export default loadOptions;