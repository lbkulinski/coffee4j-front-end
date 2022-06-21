import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import {Form, Modal} from "react-bootstrap";

type Props = {
    show: boolean,
    setShow: Function,
    requestUrl: string
};

function saveRecord(name: string): void {
    console.log(name);
} //saveRecord

function AddRecordModal(props: Props) {
    let [name, setName] = useState("");

    let hideModal = () => {
        props.setShow(false);

        setName("");
    };

    return (
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
                        <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={() => saveRecord(name)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddRecordModal;