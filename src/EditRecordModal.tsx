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
    record: Record,
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
    let formData = new FormData();

    formData.append("name", name);

    let config = {
        "withCredentials": true,
    };

    const axios = require("axios").default;

    axios.post(requestUrl, formData, config)
         .then((response: AxiosResponse<CreateResponse>) => {
             setShow(false);

             if (response.data.status === "SUCCESS") {
                 setShowSuccess(true);

                 let offsetIds: number[] = [];

                 setOffsetIds(offsetIds);

                 loadRecords(requestUrl, offsetIds, setOffsetIds, setNextDisabled, setRecords);

                 return;
             } //end if

             setShowError(true);
         });
} //saveRecord

function EditRecordModal(props: Props) {
    const [name, setName] = useState(props.record.name);

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

    const successMessage = `The specified ${recordTypeString} was successfully edited.`;

    const [showError, setShowError] = useState(false);

    const hideErrorToast = () => {
        setShowError(false);
    };

    const errorMessage = `The specified ${recordTypeString} was could not be edited.`;

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
                <Modal.Header closeButton>
                    Edit
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={props.record.name} />
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
} //EditRecordModal

export default EditRecordModal;