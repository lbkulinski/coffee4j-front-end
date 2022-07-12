import React, {useState} from "react";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AsyncCreatableSelect from "react-select/async-creatable";
import {AxiosResponse, default as axios} from "axios";
import {SingleValue} from "react-select";

type Result = {
    id: number,
    name: string
}

type ReadResponse = {
    status: string,
    content: Result[]
}

type Option = {
    value: string,
    label: string
}

type Props = {

}

function loadOptions(requestUrl: string): Promise<Option[]> {
    const config = {
        "withCredentials": true
    };

    const axios = require("axios").default;

    return new Promise<Option[]>((resolve) => {
        axios.get(requestUrl, config)
             .then((response: AxiosResponse<ReadResponse>) => {
                 if (response.data.status !== "SUCCESS") {
                     return;
                 } //end if

                 const results = response.data.content;

                 const options: Option[] = [];

                 results.forEach((result: Result) => {
                     let value = String(result.id);

                     const option = {
                         "value": value,
                         "label": result.name
                     };

                     options.push(option);
                 });

                 resolve(options);
             });
    });
} //loadOptions

function loadCoffeeOptions(inputValue: string): Promise<Option[]> {
    const requestUrl = `/api/typeahead/coffee?searchTerm=${inputValue}`;

    return loadOptions(requestUrl);
} //loadCoffeeOptions

function loadWaterOptions(inputValue: string): Promise<Option[]> {
    const requestUrl = `/api/typeahead/water?searchTerm=${inputValue}`;

    return loadOptions(requestUrl);
} //loadWaterOptions

function loadBrewerOptions(inputValue: string): Promise<Option[]> {
    const requestUrl = `/api/typeahead/brewer?searchTerm=${inputValue}`;

    return loadOptions(requestUrl);
} //loadBrewerOptions

function loadFilterOptions(inputValue: string): Promise<Option[]> {
    const requestUrl = `/api/typeahead/filter?searchTerm=${inputValue}`;

    return loadOptions(requestUrl);
} //loadFilterOptions

function loadVesselOptions(inputValue: string): Promise<Option[]> {
    const requestUrl = `/api/typeahead/vessel?searchTerm=${inputValue}`;

    return loadOptions(requestUrl);
} //loadVesselOptions

function CreateRecordModal(props: Props) {
    const [coffeeId, setCoffeeId] = useState(0);

    const handleCoffeeChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        const coffeeId = parseInt(newValue.value);

        if (isNaN(coffeeId)) {
            return;
        } //end if

        setCoffeeId(coffeeId);
    };

    const [newCoffee, setNewCoffee] = useState<string | null>(null);

    const [waterId, setWaterId] = useState(0);

    const handleWaterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        const waterId = parseInt(newValue.value);

        if (isNaN(waterId)) {
            return;
        } //end if

        setWaterId(waterId);
    };

    const [newWater, setNewWater] = useState<string | null>(null);

    const [brewerId, setBrewerId] = useState(0);

    const handleBrewerChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        const brewerId = parseInt(newValue.value);

        if (isNaN(brewerId)) {
            return;
        } //end if

        setBrewerId(brewerId);
    };

    const [newBrewer, setNewBrewer] = useState<string | null>(null);

    const [filterId, setFilterId] = useState(0);

    const handleFilterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        const filterId = parseInt(newValue.value);

        if (isNaN(filterId)) {
            return;
        } //end if

        setFilterId(filterId);
    };

    const [newFilter, setNewFilter] = useState<string | null>(null);

    const [vesselId, setVesselId] = useState(0);

    const handleVesselChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        const vesselId = parseInt(newValue.value);

        if (isNaN(vesselId)) {
            return;
        } //end if

        setVesselId(vesselId);
    };

    const [newVessel, setNewVessel] = useState<string | null>(null);

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
                                              onChange={handleCoffeeChange} onCreateOption={setNewCoffee} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadWaterOptions} defaultOptions={true}
                                              onChange={handleWaterChange} onCreateOption={setNewWater} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Brewer
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadBrewerOptions} defaultOptions={true}
                                              onChange={handleBrewerChange} onCreateOption={setNewBrewer} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Filter
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadFilterOptions} defaultOptions={true}
                                              onChange={handleFilterChange} onCreateOption={setNewFilter} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Vessel
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadVesselOptions} defaultOptions={true}
                                              onChange={handleVesselChange} onCreateOption={setNewVessel} />
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