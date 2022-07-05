import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RecordType from "./RecordType";
import {AxiosResponse} from "axios";
import loadRecords from "./loadRecords";
import Record from "./Record";

type DeleteResponse = {
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

function deleteRecord(requestUrl: string, id: number, setShow: (show: boolean) => void,
                      setShowSuccess: (showSuccess: boolean) => void, setShowError: (showError: boolean) => void,
                      setOffsetIds: (offsetIds: number[]) => void, setNextDisabled: (nextDisabled: boolean) => void,
                      setRecords: (records: Record[]) => void) {
    const deleteRequestUrl = `${requestUrl}?id=${id}`;

    const config = {
        "withCredentials": true,
    };

    const axios = require("axios").default;

    axios.delete(deleteRequestUrl, config)
         .then((response: AxiosResponse<DeleteResponse>) => {
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
} //deleteRecord

function DeleteRecordModal(props: Props) {
    const hideModal = () => {
        props.setShow(false);
    };

    const handleDelete = () => {
        deleteRecord(props.requestUrl, props.record.id, props.setShow, setShowSuccess, setShowError,
                     props.setOffsetIds, props.setNextDisabled, props.setRecords);
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

    const errorMessage = `The specified ${recordTypeString} was could not be deleted.`;

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