import React from 'react';
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

type Props = {
    name: string,
    requestUrl: string
};

function ManageRecordCard(props: Props) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {props.name}
                </Card.Title>
            <RecordTable requestUrl={props.requestUrl} />
            </Card.Body>
        </Card>
    );
}

export default ManageRecordCard;