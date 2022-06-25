import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import AddRecordModal from "./AddRecordModal";
import RecordType from "./RecordType";
import Record from "./Record";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    const [pageCount, setPageCount] = useState<number>(0);

    const [page, setPage] = useState<number>(1);

    const [records, setRecords] = useState<Record[]>([]);

    let [addShow, setAddShow] = useState(false);

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
                        Add
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} pageCount={pageCount} setPageCount={setPageCount}
                                 setPage={setPage} records={records} setRecords={setRecords} />
                </Card.Body>
            </Card>
            <AddRecordModal show={addShow} setShow={setAddShow} requestUrl={props.requestUrl}
                            recordType={props.recordType} setPageCount={setPageCount} page={page}
                            setRecords={setRecords} />
        </>
    );
}

export default ManageRecordCard;