import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Record from "./Record";
import RecordType from "./RecordType";
import {AxiosResponse, default as axios} from "axios";

type UpdateResponse = {
    status: string,
    content: string
};

type Props = {
    show: boolean,
    setShow: Function,
    requestUrl: string,
    recordType: RecordType,
    record: Record
    setRecord: Function
};

function saveRecord(requestUrl: string, record: Record, setShowSuccess: Function,
                    setShowError: Function): void {
    const axios = require("axios").default;

    let formData = new FormData();

    let idString = String(record.id);

    formData.append("id", idString);

    formData.append("name", record.name);

    axios.put(requestUrl, formData)
         .then(function (response: AxiosResponse) {
             console.log(response.data);

             setShowSuccess(true);
         })
         .catch(function (error: Error) {
             console.log(error);

             setShowError(true);
         });
} //saveRecord

function EditRecordModal(props: Props) {
    let [showSuccess, setShowSuccess] = useState(false);

    let [showError, setShowError] = useState(false);

    let hideModal = () => {
        props.setShow(false);
    };

    let saveOnClick = () => {
        hideModal();

        saveRecord(props.requestUrl, props.record, setShowSuccess, setShowError);
    };

    let recordTypeString = props.recordType.toString();

    recordTypeString = recordTypeString.toLowerCase();

    let successMessage: string = `The ${recordTypeString} was successfully edited.`;

    let errorMessage: string = `The ${recordTypeString} could not be edited. Please try again later.`;

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" value={props.record.name} onChange={
                                (event) => props.setRecord({
                                    "id": props.record.id,
                                    "name": event.target.value
                                })
                            }/>
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

export default EditRecordModal;