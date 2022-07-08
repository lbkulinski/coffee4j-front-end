import React, {useState} from "react";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AsyncSelect from "react-select/async";

type Option = {
    id: number,
    name: string
}

type Props = {

}

function loadOptions(requestUrl: string, inputValue: string, callback: (options: Option[]) => void): void {

} //loadCoffeeOptions

function CreateRecordModal(props: Props) {
    const loadCoffeeOptions = (inputValue: string, callback: (options: Option[]) => void) => {
        const requestUrl = "api/typeahead/coffee";

        loadOptions(requestUrl, inputValue, callback);
    };

    const loadWaterOptions = (inputValue: string, callback: (options: Option[]) => void) => {
        const requestUrl = "api/typeahead/water";

        loadOptions(requestUrl, inputValue, callback);
    };

    const loadBrewerOptions = (inputValue: string, callback: (options: Option[]) => void) => {
        const requestUrl = "api/typeahead/brewer";

        loadOptions(requestUrl, inputValue, callback);
    };

    const loadFilterOptions = (inputValue: string, callback: (options: Option[]) => void) => {
        const requestUrl = "api/typeahead/filter";

        loadOptions(requestUrl, inputValue, callback);
    };

    const loadVesselOptions = (inputValue: string, callback: (options: Option[]) => void) => {
        const requestUrl = "api/typeahead/vessel";

        loadOptions(requestUrl, inputValue, callback);
    };

    return (
        <>
            <Modal show>
                <Modal.Header closeButton>
                    Create
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Coffee
                        </Form.Label>
                        <AsyncSelect cacheOptions loadOptions={loadCoffeeOptions} onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water
                        </Form.Label>
                        <AsyncSelect cacheOptions loadOptions={loadWaterOptions} onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Brewer
                        </Form.Label>
                        <AsyncSelect cacheOptions loadOptions={loadBrewerOptions} onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Filter
                        </Form.Label>
                        <AsyncSelect cacheOptions loadOptions={loadFilterOptions} onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Vessel
                        </Form.Label>
                        <AsyncSelect cacheOptions loadOptions={loadVesselOptions} onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Coffee Mass
                        </Form.Label>
                        <Form.Control type="number" defaultValue="18" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water Mass
                        </Form.Label>
                        <Form.Control type="number" defaultValue="300 "/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary">
                        Close
                    </Button>
                    <Button variant="outline-primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*
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
            */}
        </>
    );
} //CreateRecordModal

export default CreateRecordModal;