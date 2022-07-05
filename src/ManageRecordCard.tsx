import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddRecordModal from "./AddRecordModal";
import Record from "./Record";
import EditRecordModal from "./EditRecordModal";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    const [offsetIds, setOffsetIds] = useState<number[]>([]);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [records, setRecords] = useState<Record[]>([]);

    const [addShow, setAddShow] = useState(false);

    const [record, setRecord] = useState({
        "id": 0,
        "name": ""
    });

    const [editShow, setEditShow] = useState(false);

    const showAddModal = () => {
        setAddShow(true);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {
                            props.recordType
                        }
                    </Card.Title>
                    <Button className="float-end" variant="outline-primary" onClick={showAddModal}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} offsetIds={offsetIds} setOffsetIds={setOffsetIds}
                                 nextDisabled={nextDisabled} setNextDisabled={setNextDisabled} records={records}
                                 setRecords={setRecords} setRecord={setRecord} setEditShow={setEditShow} />
                </Card.Body>
            </Card>
            <AddRecordModal show={addShow} setShow={setAddShow} requestUrl={props.requestUrl}
                            recordType={props.recordType} setNextDisabled={setNextDisabled} setOffsetIds={setOffsetIds}
                            setRecords={setRecords}/>
            <EditRecordModal record={record} show={editShow} setShow={setEditShow} requestUrl={props.requestUrl}
                             setOffsetIds={setOffsetIds} setNextDisabled={setNextDisabled} setRecords={setRecords}
                             recordType={props.recordType} />
        </>
    );
} //ManageRecordCard

export default ManageRecordCard;