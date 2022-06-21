import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import AddRecordModal from "./AddRecordModal";

type Props = {
    name: string,
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    let [addShow, setAddShow] = useState(false);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {
                            props.name
                        }
                    </Card.Title>
                    <Button className="float-end" variant="outline-primary" onClick={() => setAddShow(true)}>
                        Add
                    </Button>
                    <RecordTable requestUrl={props.requestUrl} />
                </Card.Body>
            </Card>
            <AddRecordModal show={addShow} setShow={setAddShow} requestUrl={props.requestUrl} />
        </>
    );
}

export default ManageRecordCard;