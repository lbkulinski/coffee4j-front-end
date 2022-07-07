import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import CreateRecordModal from "./CreateRecordModal";
import Record from "./Record";
import UpdateRecordModal from "./UpdateRecordModal";
import DeleteRecordModal from "./DeleteRecordModal";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    const [offsetIds, setOffsetIds] = useState<number[]>([]);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [records, setRecords] = useState<Record[]>([]);

    const [createShow, setCreateShow] = useState(false);

    const [record, setRecord] = useState({
        "id": 0,
        "name": ""
    });

    const [updateShow, setUpdateShow] = useState(false);

    const [deleteShow, setDeleteShow] = useState(false);

    const showCreateModal = () => {
        setCreateShow(true);
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
                    <Button className="float-end" variant="outline-primary" onClick={showCreateModal}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} offsetIds={offsetIds} setOffsetIds={setOffsetIds}
                                 nextDisabled={nextDisabled} setNextDisabled={setNextDisabled} records={records}
                                 setRecords={setRecords} setRecord={setRecord} setUpdateShow={setUpdateShow}
                                 setDeleteShow={setDeleteShow} />
                </Card.Body>
            </Card>
            <CreateRecordModal show={createShow} setShow={setCreateShow} requestUrl={props.requestUrl}
                               recordType={props.recordType} setNextDisabled={setNextDisabled}
                               setOffsetIds={setOffsetIds} setRecords={setRecords}/>
            <UpdateRecordModal record={record} setRecord={setRecord} show={updateShow}
                               setShow={setUpdateShow} requestUrl={props.requestUrl} setOffsetIds={setOffsetIds}
                               setNextDisabled={setNextDisabled} setRecords={setRecords}
                               recordType={props.recordType} />
            <DeleteRecordModal record={record} show={deleteShow} setShow={setDeleteShow} requestUrl={props.requestUrl}
                               setOffsetIds={setOffsetIds} setNextDisabled={setNextDisabled} setRecords={setRecords}
                               recordType={props.recordType} />
        </>
    );
} //ManageRecordCard

export default ManageRecordCard;