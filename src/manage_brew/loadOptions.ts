import {AxiosResponse, default as axios} from "axios";
import RecordType from "../manage_record/RecordType";

export interface Option {
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

interface CreateResponse {
    status: string,
    content: string
}

export function loadOptions(type: RecordType, searchTerm: string): Promise<Option[]> {
    const typeString = type.toLowerCase();

    let requestUrl = `/api/typeahead/${typeString}`;

    if (searchTerm !== "") {
        requestUrl += `?searchTerm=${searchTerm}`;
    } //end if

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

export function getRecordPromise(option: Option, type: RecordType): Promise<number | null> {
    return new Promise<number | null>((resolve) => {
        if (!option.__isNew__) {
            const id = Number(option.value);

            if (isNaN(id)) {
                resolve(null);

                return;
            } //end if

            resolve(id);

            return;
        } //end if

        let requestUrl;

        switch (type) {
            case RecordType.COFFEE:
                requestUrl = "/api/coffee";
                break;
            case RecordType.WATER:
                requestUrl = "/api/water";
                break;
            case RecordType.BREWER:
                requestUrl = "/api/brewer";
                break;
            case RecordType.FILTER:
                requestUrl = "/api/filter";
                break;
            case RecordType.VESSEL:
                requestUrl = "/api/vessel";
                break;
            default:
                resolve(null);
                return;
        } //end switch

        const formData = new FormData();

        formData.append("name", option.value);

        const config = {
            "withCredentials": true,
        };

        const axios = require("axios").default;

        axios.post(requestUrl, formData, config)
             .then((response: AxiosResponse<CreateResponse>) => {
                 if (response.data.status !== "SUCCESS") {
                     resolve(null);

                     return;
                 } //end if

                 const location = response.headers["location"];

                 const url = new URL(location);

                 const searchParameters = new URLSearchParams(url.search);

                 if (!searchParameters.has("id")) {
                     resolve(null);

                     return;
                 } //end if

                 const idString = searchParameters.get("id");

                 const id = Number(idString);

                 if (isNaN(id)) {
                     resolve(null);

                     return;
                 } //end if

                 resolve(id);
             });
    });
} //getRecordPromise