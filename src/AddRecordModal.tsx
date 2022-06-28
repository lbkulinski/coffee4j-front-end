import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import RecordType from "./RecordType";
import loadRecords from "./loadRecords";

type Props = {
    show: boolean,
    setShow: Function,
    requestUrl: string,
    recordType: RecordType,
    offsetIds: number[],
    setOffsetIds: Function,
    setNextDisabled: Function,
    setRecords: Function
};

function saveRecord(props: Props, name: string, setShowSuccess: Function, setShowError: Function): void {
    const formData = new FormData();

    formData.append("name", name);

    const axios = require("axios").default;

    axios.post(props.requestUrl, formData)
         .then(() => {
             setShowSuccess(true);

             let offsetIds = [...props.offsetIds];

             if (props.offsetIds.length > 1) {
                 offsetIds.pop();

                 props.setOffsetIds(offsetIds);
             } //end if

             loadRecords(props.requestUrl, offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);
         })
         .catch(() => setShowError(true));
} //saveRecord

function AddRecordModal(props: Props) {
    const [name, setName] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);

    const [showError, setShowError] = useState(false);

    const hideModal = () => {
        props.setShow(false);

        setName("");
    };

    const saveOnClick = () => {
        hideModal();

        saveRecord(props, name, setShowSuccess, setShowError);
    };

    const recordTypeString = props.recordType.toString()
                                             .toLowerCase();

    const successMessage: string = `The ${recordTypeString} was successfully added.`;

    const errorMessage: string = `The ${recordTypeString} could not be added. Please try again later.`;

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
                            <Form.Control type="text" value={name} onChange={
                                (event) => setName(event.target.value)
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
                <Toast autohide={true} show={showSuccess} onClose={
                    () => setShowSuccess(false)
                }>
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
                <Toast autohide={true} show={showError} onClose={
                    () => setShowError(false)
                }>
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