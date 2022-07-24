import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {AxiosResponse} from "axios";
import loadRecords from "./loadRecords";
import Record from "./Record";

interface DeleteResponse {
    status: string,
    content: string
}

interface Props {
    record: Record,
    show: boolean,
    setShow: (show: boolean) => void,
    requestUrl: string,
    setOffsetIds: (offsetIds: number[]) => void,
    setNextDisabled: (nextDisabled: boolean) => void,
    setRecords: (records: Record[]) => void,
    recordType: RecordType
}

function deleteRecord(props: Props, setShowSuccess: (showSuccess: boolean) => void,
                      setShowError: (showError: boolean) => void) {
    const deleteRequestUrl = `${props.requestUrl}?id=${props.record.id}`;

    const config = {
        "withCredentials": true,
    };

    const axios = require("axios").default;

    axios.delete(deleteRequestUrl, config)
         .then((response: AxiosResponse<DeleteResponse>) => {
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
} //deleteRecord

function DeleteRecordModal(props: Props) {
    const hideModal = () => {
        props.setShow(false);
    };

    const handleDelete = () => {
        deleteRecord(props, setShowSuccess, setShowError);
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const hideSuccessToast = () => {
        setShowSuccess(false);
    };

    const recordTypeString = props.recordType.toLowerCase();

    const bodyMessage = `Are you sure you want to delete the specified ${recordTypeString}?`;

    const successMessage = `The specified ${recordTypeString} was successfully deleted.`;

    const [showError, setShowError] = useState(false);

    const hideErrorToast = () => {
        setShowError(false);
    };

    const errorMessage = `The specified ${recordTypeString} could not be deleted.`;

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
                <Modal.Header closeButton>
                    Delete
                </Modal.Header>
                <Modal.Body>
                    {
                        bodyMessage
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={hideModal}>
                        No
                    </Button>
                    <Button variant="outline-primary" onClick={handleDelete}>
                        Yes
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
} //DeleteRecordModal

export default DeleteRecordModal;