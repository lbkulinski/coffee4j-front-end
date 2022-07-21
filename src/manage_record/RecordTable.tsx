import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import Record from "./Record";
import {Pagination} from "react-bootstrap";
import loadRecords from "./loadRecords";

type Props = {
    requestUrl: string,
    offsetIds: number[],
    setOffsetIds: (offsetIds: number[]) => void,
    nextDisabled: boolean,
    setNextDisabled: (nextDisabled: boolean) => void,
    records: Record[],
    setRecords: (records: Record[]) => void,
    setRecord: (record: Record) => void,
    setUpdateShow: (updateShow: boolean) => void,
    setDeleteShow: (deleteShow: boolean) => void
}

function RecordTable(props: Props) {
    const [previousDisabled, setPreviousDisabled] = useState(true);

    useEffect(() => {
        loadRecords(props.requestUrl, props.offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);
    }, []);

    const loadPreviousRecords = () => {
        if (props.offsetIds.length === 0) {
            return;
        } //end if

        const offsetIdsCopy = [...props.offsetIds];

        offsetIdsCopy.pop();

        if (offsetIdsCopy.length >= 1) {
            offsetIdsCopy.pop();
        } //end if

        if (offsetIdsCopy.length === 0) {
            setPreviousDisabled(true);
        } //end if

        props.setOffsetIds(offsetIdsCopy);

        loadRecords(props.requestUrl, offsetIdsCopy, props.setOffsetIds, props.setNextDisabled, props.setRecords);
    };

    const loadNextRecords = () => {
        if (props.offsetIds.length >= 1) {
            setPreviousDisabled(false);
        } //end if

        loadRecords(props.requestUrl, props.offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);
    };

    return (
        <>
            <Table striped hover responsive>
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
                            <RecordRow key={record.id} record={record} setRecord={props.setRecord}
                                       setUpdateShow={props.setUpdateShow} setDeleteShow={props.setDeleteShow} />
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
} //RecordTable

export default RecordTable;