import React, {ReactElement} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

type Props = {
    show: boolean,
    setShow: Function,
    header: string,
    body: string
};

function MessageModal(props: Props) {
    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header>
                <Modal.Title>
                    {
                        props.header
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.body
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={() => props.setShow(false)}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageModal;