import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import Record from "./Record";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import RecordRow from "./RecordRow";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    const [offsetId, setOffsetId] = useState<number | null>(0);

    const [records, setRecords] = useState<Record[]>([]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {
                            props.recordType
                        }
                    </Card.Title>
                    <Button className="float-end" variant="outline-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} offsetId={offsetId} setOffsetId={setOffsetId}
                                 records={records} setRecords={setRecords} />
                </Card.Body>
            </Card>
        </>
    );
}

export default ManageRecordCard;