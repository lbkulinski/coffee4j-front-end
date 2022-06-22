import React, {ChangeEvent, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import {AxiosResponse} from "axios";
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

function saveRecord(requestUrl: string, name: string, setShowSuccess: Function, setShowError: Function): void {
    const axios = require("axios").default;

    let data = new URLSearchParams({
        "name": name
    });

    axios.post(requestUrl, data)
         .then(function (response: AxiosResponse<CreateResponse>) {
             console.log(response.data);

             setShowSuccess(true);
         })
         .catch(function (error: Error) {
             console.log(error);

             setShowError(true);
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

    let saveOnClick = () => {
        hideModal();

        saveRecord(props.requestUrl, name, setShowSuccess, setShowError);
    };

    let recordTypeString = props.recordType.toString();

    recordTypeString = recordTypeString.toLowerCase();

    let successMessage: string = `The ${recordTypeString} was successfully added.`;

    let errorMessage: string = `The ${recordTypeString} could not be added. Please try again later.`;

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
                    <Button variant="outline-primary"
                            onClick={saveOnClick}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer className="p-3" position="top-end">
                <Toast autohide={true} show={showSuccess} onClose={() => setShowSuccess(false)}>
                    <Toast.Header>
                        <strong className="me-auto">
                            Coffee4j
                        </strong>
                    </Toast.Header>
                    <Toast.Body>
                        {
                            successMessage
                        }
                    </Toast.Body>
                </Toast>
                <Toast autohide={true} show={showError} onClose={() => setShowError(false)}>
                    <Toast.Header>
                        <strong className="me-auto">
                            Coffee4j
                        </strong>
                    </Toast.Header>
                    <Toast.Body>
                        {
                            errorMessage
                        }
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default AddRecordModal;