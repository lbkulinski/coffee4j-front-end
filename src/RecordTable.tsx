import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import Record from "./Record";
import loadRecords from "./loadRecords";
import {Pagination} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
    requestUrl: string,
    offsetId: number | null,
    setOffsetId: Function,
    records: Record[],
    setRecords: Function
}

function RecordTable(props: Props) {
    const fetchNewRecords = () => {
        if (props.offsetId === null) {
            return;
        } //end if

        let requestUrl = `${props.requestUrl}?offsetId=${props.offsetId}`;

        loadRecords(requestUrl, props.offsetId, props.setOffsetId, props.records, props.setRecords)
    };

    useEffect(() => {
        fetchNewRecords();
    }, []);

    return (
        <>
            <div
                id="div_scrollable"
                style={{
                    height: 300,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
            />
            <InfiniteScroll next={fetchNewRecords} hasMore={props.offsetId !== null}
                            loader={<span>Loading...</span>} dataLength={props.records.length}
                            scrollableTarget="div_scrollable">
                {
                    props.records.map((record: Record) => (
                        <RecordRow key={record.id} record={record} />
                    ))
                }
            </InfiniteScroll>
        </>
    );
}

export default RecordTable;