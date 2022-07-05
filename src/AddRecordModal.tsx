import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {AxiosResponse} from "axios";
import loadRecords from "./loadRecords";
import Record from "./Record";

type CreateResponse = {
    status: string,
    content: string
}

type Props = {
    show: boolean,
    setShow: (show: boolean) => void,
    requestUrl: string,
    setOffsetIds: (offsetIds: number[]) => void,
    setNextDisabled: (nextDisabled: boolean) => void,
    setRecords: (records: Record[]) => void,
    recordType: RecordType
}

function saveRecord(requestUrl: string, name: string, setShow: (show: boolean) => void,
                    setShowSuccess: (showSuccess: boolean) => void, setShowError: (showError: boolean) => void,
                    setOffsetIds: (offsetIds: number[]) => void, setNextDisabled: (nextDisabled: boolean) => void,
                    setRecords: (records: Record[]) => void) {
    const formData = new FormData();

    formData.append("name", name);

    const config = {
        "withCredentials": true,
    };

    const axios = require("axios").default;

    axios.post(requestUrl, formData, config)
         .then((response: AxiosResponse<CreateResponse>) => {
             setShow(false);

             if (response.data.status === "SUCCESS") {
                 setShowSuccess(true);

                 const offsetIds: number[] = [];

                 setOffsetIds(offsetIds);

                 loadRecords(requestUrl, offsetIds, setOffsetIds, setNextDisabled, setRecords);

                 return;
             } //end if

             setShowError(true);
         });
} //saveRecord

function AddRecordModal(props: Props) {
    const [name, setName] = useState("");

    const resetModal = () => {
        setName("");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value)
    };

    const hideModal = () => {
        props.setShow(false);
    };

    const handleSave = () => {
        saveRecord(props.requestUrl, name, props.setShow, setShowSuccess, setShowError, props.setOffsetIds,
                   props.setNextDisabled, props.setRecords);
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const hideSuccessToast = () => {
        setShowSuccess(false);
    };

    const recordTypeString = props.recordType.toLowerCase();

    const successMessage = `The specified ${recordTypeString} was successfully added.`;

    const [showError, setShowError] = useState(false);

    const hideErrorToast = () => {
        setShowError(false);
    };

    const errorMessage = `The specified ${recordTypeString} was could not be added.`;

    return (
        <>
            <Modal show={props.show} onShow={resetModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    Add
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control defaultValue={name} onChange={handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer className="p-3" position="top-end">
                <Toast show={showSuccess} onClose={hideSuccessToast} delay={3000} autohide>
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
                <Toast show={showError} onClose={hideErrorToast} delay={3000} autohide>
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
} //AddRecordModal

export default AddRecordModal;