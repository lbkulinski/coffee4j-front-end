import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, FormControl, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

type Props = {
    show: boolean,
    setShow: (show: boolean) => void,
    requestUrl: string
}

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

    return (
        <Modal show={props.show} onShow={resetModal} onHide={hideModal}>
            <Modal.Header closeButton>
                Add
            </Modal.Header>
            <Modal.Body>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control type="text" value={name} onChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={hideModal}>
                    Close
                </Button>
                <Button variant="outline-primary">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
} //RecordRow

export default AddRecordModal;