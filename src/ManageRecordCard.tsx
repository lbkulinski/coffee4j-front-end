import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import AddRecordModal from "./AddRecordModal";
import RecordType from "./RecordType";
import Record from "./Record";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    const [offsetIds, setOffsetIds] = useState<number[]>([0]);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [records, setRecords] = useState<Record[]>([]);

    const [addShow, setAddShow] = useState(false);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {
                            props.recordType
                        }
                    </Card.Title>
                    <Button className="float-end" variant="outline-primary" onClick={
                        () => setAddShow(true)
                    }>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} offsetIds={offsetIds} setOffsetIds={setOffsetIds}
                                 nextDisabled={nextDisabled} setNextDisabled={setNextDisabled} records={records}
                                 setRecords={setRecords} />
                </Card.Body>
            </Card>
            <AddRecordModal show={addShow} setShow={setAddShow} requestUrl={props.requestUrl}
                            recordType={props.recordType} offsetIds={offsetIds} setOffsetIds={setOffsetIds}
                            setNextDisabled={setNextDisabled} setRecords={setRecords} />
        </>
    );
}

export default ManageRecordCard;