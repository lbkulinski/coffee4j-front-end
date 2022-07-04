import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import Record from "./Record";
import {Pagination} from "react-bootstrap";
import {AxiosResponse} from "axios";

type ReadResponse = {
    status: string,
    content: Record[]
}

type Props = {
    requestUrl: string
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

function RecordTable(props: Props) {
    const [offsetIds, setOffsetIds] = useState<number[]>([]);

    const [previousDisabled, setPreviousDisabled] = useState(true);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        loadRecords(props.requestUrl, offsetIds, setOffsetIds, setNextDisabled, setRecords);
    }, []);

    const loadPreviousRecords = () => {
        if (offsetIds.length === 0) {
            return;
        } //end if

        const offsetIdsCopy = [...offsetIds];

        offsetIdsCopy.pop();

        if (offsetIdsCopy.length >= 1) {
            offsetIdsCopy.pop();
        } //end if

        if (offsetIdsCopy.length === 0) {
            setPreviousDisabled(true);
        } //end if

        setOffsetIds(offsetIdsCopy);

        loadRecords(props.requestUrl, offsetIdsCopy, setOffsetIds, setNextDisabled, setRecords);
    };

    const loadNextRecords = () => {
        if (offsetIds.length >= 1) {
            setPreviousDisabled(false);
        } //end if

        loadRecords(props.requestUrl, offsetIds, setOffsetIds, setNextDisabled, setRecords);
    };

    return (
        <>
            <Table striped hover>
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody id="tbody_records">
                    {
                        records.map((record: Record) => (
                            <RecordRow key={record.id} record={record} />
                        ))
                    }
                </tbody>
            </Table>
            <Pagination className="justify-content-end">
                <Pagination.Prev disabled={previousDisabled} onClick={loadPreviousRecords}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Pagination.Prev>
                <Pagination.Next disabled={nextDisabled} onClick={loadNextRecords}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </Pagination.Next>
            </Pagination>
        </>
    );
}

export default RecordTable;