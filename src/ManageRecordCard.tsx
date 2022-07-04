import React from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

type Props = {
    recordType: RecordType
    requestUrl: string
};

function ManageRecordCard(props: Props) {
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
                    <RecordTable requestUrl={props.requestUrl} />
                </Card.Body>
            </Card>
        </>
    );
}

export default ManageRecordCard;