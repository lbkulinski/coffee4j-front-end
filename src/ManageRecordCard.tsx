import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import AddRecordModal from "./AddRecordModal";
import RecordType from "./RecordType";
import EditRecordModal from "./EditRecordModal";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    const [addShow, setAddShow] = useState(false);

    const [editShow, setEditShow] = useState(false);

    const [record, setRecord] = useState({
        "id": 0,
        "name": ""
    });

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {
                            props.recordType
                        }
                    </Card.Title>
                    <Button className="float-end" variant="outline-primary" onClick={() => setAddShow(true)}>
                        Add
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} setEditShow={setEditShow} setRecord={setRecord} />
                </Card.Body>
            </Card>
            <AddRecordModal show={addShow} setShow={setAddShow} requestUrl={props.requestUrl}
                            recordType={props.recordType} />
            <EditRecordModal show={editShow} setShow={setEditShow} requestUrl={props.requestUrl}
                             recordType={props.recordType} record={record} setRecord={setRecord} />
        </>
    );
}

export default ManageRecordCard;