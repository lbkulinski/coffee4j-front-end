import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import {Form, Modal} from "react-bootstrap";
import {AxiosResponse} from "axios";
import MessageModal from "./MessageModal";
import RecordType from "./RecordType";

type CreateResponse = {
    status: string,
    content: string
};

type Props = {
    show: boolean,
    setShow: Function,
    requestUrl: string,
    recordType: RecordType
};

function saveRecord(requestUrl: string, name: string): void {
    const axios = require("axios").default;

    let data = new URLSearchParams({
        "name": name
    });

    axios.post(requestUrl, data)
         .then(function (response: AxiosResponse<CreateResponse>) {
             console.log(response.data);
         })
         .catch(function (error: Error) {
             console.log(error);
         });
} //saveRecord

function AddRecordModal(props: Props) {
    let [name, setName] = useState("");

    let [showSuccess, setShowSuccess] = useState(false);

    let [showError, setShowError] = useState(false);

    let hideModal = () => {
        props.setShow(false);

        setName("");
    };

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="outline-primary" onClick={() => saveRecord(props.requestUrl, name)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <MessageModal show={showSuccess} setShow={setShowSuccess} header="Add" body="" />
            <MessageModal show={showError} setShow={setShowError} header="Add" body="" />
        </>
    );
}

export default AddRecordModal;