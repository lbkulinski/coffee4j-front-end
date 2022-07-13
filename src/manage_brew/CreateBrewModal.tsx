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
    label: string,
    __isNew__: boolean
}

type Brew = {
    coffee: Option | null,
    water: Option | null,
    brewer: Option | null,
    filter: Option | null,
    vessel: Option | null
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

                     const option: Option = {
                         "value": value,
                         "label": result.name,
                         "__isNew__": false
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

function saveBrew(brew: Brew): void {
} //saveBrew

function CreateRecordModal(props: Props) {
    // {label: "hello", value: "hello", __isNew__: true}

    const [coffee, setCoffee] = useState<Option | null>(null);

    const handleCoffeeChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setCoffee(newValue);
    };

    const [water, setWater] = useState<Option | null>(null);

    const handleWaterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

       setWater(newValue);
    };

    const [brewer, setBrewer] = useState<Option | null>(null);

    const handleBrewerChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setBrewer(newValue);
    };

    const [filter, setFilter] = useState<Option | null>(null);

    const handleFilterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setFilter(newValue);
    };

    const [vessel, setVessel] = useState<Option | null>(null);

    const handleVesselChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setVessel(newValue);
    };

    const [coffeeMass, setCoffeeMass] = useState(0.0);

    const handleCoffeeMassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = parseInt(event.target.value);

        if (isNaN(newValue)) {
            return;
        } //end if

        setCoffeeMass(newValue);
    };

    const [waterMass, setWaterMass] = useState(0.0);

    const handleWaterMassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = parseInt(event.target.value);

        if (isNaN(newValue)) {
            return;
        } //end if

        setWaterMass(newValue);
    };

    const [saveDisabled, setSaveDisabled] = useState(true);

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
                                              onChange={handleCoffeeChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please select a coffee.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadWaterOptions} defaultOptions={true}
                                              onChange={handleWaterChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please select a water.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Brewer
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadBrewerOptions} defaultOptions={true}
                                              onChange={handleBrewerChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please select a brewer.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Filter
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadFilterOptions} defaultOptions={true}
                                              onChange={handleFilterChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please select a filter.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Vessel
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadVesselOptions} defaultOptions={true}
                                              onChange={handleVesselChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please select a vessel.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Coffee Mass
                        </Form.Label>
                        <Form.Control type="text" defaultValue="18" onChange={handleCoffeeMassChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please enter a valid coffee mass.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water Mass
                        </Form.Label>
                        <Form.Control type="text" defaultValue="300" onChange={handleWaterMassChange} />
                        <Form.Control.Feedback type="invalid" style={{"display": "block"}}>
                            Please enter a valid water mass.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary">
                        Close
                    </Button>
                    <Button variant="outline-primary" disabled={saveDisabled} onClick={() => {
                        const brew: Brew = {
                            "coffee": coffee,
                            "water": water,
                            "brewer": brewer,
                            "filter": filter,
                            "vessel": vessel
                        };

                        saveBrew(brew);
                    }}>
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