import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import Record from "./Record";
import loadRecords from "./loadRecords";
import {Pagination} from "react-bootstrap";

type Props = {
    requestUrl: string,
    offsetIds: number[],
    setOffsetIds: Function,
    nextDisabled: boolean,
    setNextDisabled: Function,
    records: Record[],
    setRecords: Function
}

function RecordTable(props: Props) {
    const [previousDisabled, setPreviousDisabled] = useState(true);

    useEffect(() => {
        loadRecords(props.requestUrl, props.offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);
    }, []);

    const loadPreviousRecords = () => {
        if (props.offsetIds.length === 1) {
            return;
        } //end if

        const offsetIds = [...props.offsetIds];

        offsetIds.pop();

        if (offsetIds.length > 1) {
            offsetIds.pop();
        } //end if

        if (offsetIds.length === 1) {
            setPreviousDisabled(true);
        } //end if

        props.setOffsetIds(offsetIds);

        loadRecords(props.requestUrl, offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);
    };

    const loadNextRecords = () => {
        if (props.offsetIds.length > 1) {
            setPreviousDisabled(false);
        } //end if

        loadRecords(props.requestUrl, props.offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);
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
                        props.records.map((record: Record) => (
                            <RecordRow key={record.id} name={record.name} />
                        ))
                    }
                </tbody>
            </Table>
            <Pagination className="justify-content-end">
                <Pagination.Prev disabled={previousDisabled} onClick={loadPreviousRecords}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Pagination.Prev>
                <Pagination.Next disabled={props.nextDisabled} onClick={loadNextRecords}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </Pagination.Next>
            </Pagination>
        </>
    );
}

export default RecordTable;