import React, {useState} from "react";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AsyncCreatableSelect from "react-select/async-creatable";
import {AxiosResponse} from "axios";

type Result = {
    id: number,
    name: string
}

type ReadResponse = {
    status: string,
    content: Result[]
}

type Option = {
    value: number,
    label: string
}

type Props = {

}

function loadOptions(requestUrl: string, callback: (options: Option[]) => void): void {
    const config = {
        "withCredentials": true
    };

    const axios = require("axios").default;

    axios.get(requestUrl, config)
         .then((response: AxiosResponse<ReadResponse>) => {
             if (response.data.status !== "SUCCESS") {
                 return;
             } //end if

             const results = response.data.content;

             const options: Option[] = [];

             results.forEach((result: Result) => {
                 const option = {
                     "value": result.id,
                     "label": result.name
                 };

                 options.push(option);
             });

             callback(options);
         });
} //loadOptions

function loadCoffeeOptions(inputValue: string, callback: (options: Option[]) => void): void {
    const requestUrl = `/api/typeahead/coffee?searchTerm=${inputValue}`;

    loadOptions(requestUrl, callback);
} //loadCoffeeOptions

function loadWaterOptions(inputValue: string, callback: (options: Option[]) => void): void {
    const requestUrl = `/api/typeahead/water?searchTerm=${inputValue}`;

    loadOptions(requestUrl, callback);
} //loadWaterOptions

function loadBrewerOptions(inputValue: string, callback: (options: Option[]) => void): void {
    const requestUrl = `/api/typeahead/brewer?searchTerm=${inputValue}`;

    loadOptions(requestUrl, callback);
} //loadBrewerOptions

function loadFilterOptions(inputValue: string, callback: (options: Option[]) => void): void {
    const requestUrl = `/api/typeahead/filter?searchTerm=${inputValue}`;

    loadOptions(requestUrl, callback);
} //loadFilterOptions

function loadVesselOptions(inputValue: string, callback: (options: Option[]) => void): void {
    const requestUrl = `/api/typeahead/vessel?searchTerm=${inputValue}`;

    loadOptions(requestUrl, callback);
} //loadVesselOptions

function CreateRecordModal(props: Props) {
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
                        <AsyncCreatableSelect cacheOptions loadOptions={loadCoffeeOptions} defaultOptions={true}
                                              onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadWaterOptions} defaultOptions={true}
                                              onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Brewer
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadBrewerOptions} defaultOptions={true}
                                              onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Filter
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadFilterOptions} defaultOptions={true}
                                              onInputChange={() => {}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Vessel
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadVesselOptions} defaultOptions={true}
                                              onInputChange={() => {}} />
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
                        <Form.Control type="number" defaultValue="300" />
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