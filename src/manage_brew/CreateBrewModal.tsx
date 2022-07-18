import React, {CSSProperties, useState} from "react";
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
    coffee: {
        value: Option | null,
        setShowError: (showError: CSSProperties) => void
    },
    water: {
        value: Option | null,
        setShowError: (showError: CSSProperties) => void
    },
    brewer: {
        value: Option | null,
        setShowError: (showError: CSSProperties) => void
    },
    filter: {
        value: Option | null,
        setShowError: (showError: CSSProperties) => void
    },
    vessel: {
        value: Option | null,
        setShowError: (showError: CSSProperties) => void
    },
    coffeeMass: {
        value: number,
        setShowError: (showError: CSSProperties) => void
    },
    waterMass: {
        value: number,
        setShowError: (showError: CSSProperties) => void
    }
}

type Props = {
    show: boolean,
    setShow: (show: boolean) => void
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
    if (brew.coffee.value === null) {
        brew.coffee.setShowError({
            "display": "block"
        });
    } //end if

    if (brew.water.value === null) {
        brew.water.setShowError({
            "display": "block"
        });
    } //end if

    if (brew.brewer.value === null) {
        brew.brewer.setShowError({
            "display": "block"
        });
    } //end if

    if (brew.filter.value === null) {
        brew.filter.setShowError({
            "display": "block"
        });
    } //end if

    if (brew.vessel.value === null) {
        brew.vessel.setShowError({
            "display": "block"
        });
    } //end if
} //saveBrew

function CreateRecordModal(props: Props) {
    // {label: "hello", value: "hello", __isNew__: true}

    const hideModal = () => {
        props.setShow(false);
    };

    const [coffee, setCoffee] = useState<Option | null>(null);

    const [showCoffeeError, setShowCoffeeError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleCoffeeChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setCoffee(newValue);
        
        setShowCoffeeError({
            "display": "none"
        });
    };

    const [water, setWater] = useState<Option | null>(null);

    const [showWaterError, setShowWaterError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleWaterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

       setWater(newValue);
        
        setShowWaterError({
            "display": "none"
        });
    };

    const [brewer, setBrewer] = useState<Option | null>(null);

    const [showBrewerError, setShowBrewerError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleBrewerChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setBrewer(newValue);
        
        setShowBrewerError({
            "display": "none"
        });
    };

    const [filter, setFilter] = useState<Option | null>(null);

    const [showFilterError, setShowFilterError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleFilterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setFilter(newValue);
        
        setShowFilterError({
            "display": "none"
        });
    };

    const [vessel, setVessel] = useState<Option | null>(null);

    const [showVesselError, setShowVesselError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleVesselChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setVessel(newValue);

        setShowVesselError({
            "display": "none"
        });
    };

    const [coffeeMass, setCoffeeMass] = useState(0.0);

    const [showCoffeeMassError, setShowCoffeeMassError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleCoffeeMassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = Number(event.target.value);

        if (isNaN(newValue)) {
            setShowCoffeeMassError({
                "display": "block"
            });

            return;
        } //end if

        setCoffeeMass(newValue);

        setShowCoffeeMassError({
            "display": "none"
        });
    };

    const [waterMass, setWaterMass] = useState(0.0);

    const [showWaterMassError, setShowWaterMassError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleWaterMassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = Number(event.target.value);

        if (isNaN(newValue)) {
            setShowWaterMassError({
                "display": "block"
            });

            return;
        } //end if

        setWaterMass(newValue);
        
        setShowWaterMassError({
            "display": "none"
        });
    };

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
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
                        <Form.Control.Feedback type="invalid" style={showCoffeeError}>
                            Please select a coffee.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadWaterOptions} defaultOptions={true}
                                              onChange={handleWaterChange} />
                        <Form.Control.Feedback type="invalid" style={showWaterError}>
                            Please select a water.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Brewer
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadBrewerOptions} defaultOptions={true}
                                              onChange={handleBrewerChange} />
                        <Form.Control.Feedback type="invalid" style={showBrewerError}>
                            Please select a brewer.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Filter
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadFilterOptions} defaultOptions={true}
                                              onChange={handleFilterChange} />
                        <Form.Control.Feedback type="invalid" style={showFilterError}>
                            Please select a filter.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Vessel
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadVesselOptions} defaultOptions={true}
                                              onChange={handleVesselChange} />
                        <Form.Control.Feedback type="invalid" style={showVesselError}>
                            Please select a vessel.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Coffee Mass
                        </Form.Label>
                        <Form.Control type="text" defaultValue="18" onChange={handleCoffeeMassChange} />
                        <Form.Control.Feedback type="invalid" style={showCoffeeMassError}>
                            Please enter a valid coffee mass.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water Mass
                        </Form.Label>
                        <Form.Control type="text" defaultValue="300" onChange={handleWaterMassChange} />
                        <Form.Control.Feedback type="invalid" style={showWaterMassError}>
                            Please enter a valid water mass.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary">
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={() => {
                        const brew: Brew = {
                            "coffee": {
                                "value": coffee,
                                "setShowError": setShowCoffeeError
                            },
                            "water": {
                                "value": water,
                                "setShowError": setShowWaterError
                            },
                            "brewer": {
                                "value": brewer,
                                "setShowError": setShowBrewerError
                            },
                            "filter": {
                                "value": filter,
                                "setShowError": setShowFilterError
                            },
                            "vessel": {
                                "value": vessel,
                                "setShowError": setShowVesselError
                            },
                            "coffeeMass": {
                                "value": coffeeMass,
                                "setShowError": setShowCoffeeMassError
                            },
                            "waterMass": {
                                "value": waterMass,
                                "setShowError": setShowWaterMassError
                            }
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