import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {AxiosResponse} from "axios";
import loadRecords from "./loadRecords";
import Record from "./Record";

type UpdateResponse = {
    status: string,
    content: string
}

type Props = {
    record: Record,
    setRecord: (record: Record) => void,
    show: boolean,
    setShow: (show: boolean) => void,
    requestUrl: string,
    setOffsetIds: (offsetIds: number[]) => void,
    setNextDisabled: (nextDisabled: boolean) => void,
    setRecords: (records: Record[]) => void,
    recordType: RecordType
}

function updateRecord(props: Props, name: string, setShowSuccess: (showSuccess: boolean) => void,
                      setShowError: (showError: boolean) => void) {
    const formData = new FormData();

    const idString = String(props.record.id);

    formData.append("id", idString);

    formData.append("name", name);

    const config = {
        "withCredentials": true,
    };

    const axios = require("axios").default;

    axios.put(props.requestUrl, formData, config)
         .then((response: AxiosResponse<UpdateResponse>) => {
             props.setShow(false);

             if (response.data.status === "SUCCESS") {
                 setShowSuccess(true);

                 const offsetIds: number[] = [];

                 props.setOffsetIds(offsetIds);

                 loadRecords(props.requestUrl, offsetIds, props.setOffsetIds, props.setNextDisabled, props.setRecords);

                 return;
             } //end if

             setShowError(true);
         });
} //updateRecord

function UpdateRecordModal(props: Props) {
    const [name, setName] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const hideModal = () => {
        props.setShow(false);
    };

    const handleUpdate = () => {
        updateRecord(props, name, setShowSuccess, setShowError);
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const hideSuccessToast = () => {
        setShowSuccess(false);
    };

    const recordTypeString = props.recordType.toLowerCase();

    const successMessage = `The specified ${recordTypeString} was successfully updated.`;

    const [showError, setShowError] = useState(false);

    const hideErrorToast = () => {
        setShowError(false);
    };

    const errorMessage = `The specified ${recordTypeString} was could not be updated.`;

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
                <Modal.Header closeButton>
                    Update
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control type="text" defaultValue={props.record.name} onChange={handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={handleUpdate}>
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
} //UpdateRecordModal

export default UpdateRecordModal;