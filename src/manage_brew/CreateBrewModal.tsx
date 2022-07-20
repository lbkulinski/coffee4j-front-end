import React, {CSSProperties, useState} from "react";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AsyncCreatableSelect from "react-select/async-creatable";
import {AxiosResponse} from "axios";
import {SingleValue} from "react-select";
import RecordType from "../manage_record/RecordType";

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

type CreateResponse = {
    status: string,
    content: string
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
                     resolve([]);

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

function getRecordPromise(option: Option, type: RecordType): Promise<number | null> {
    return new Promise<number | null>((resolve) => {
        console.log(option);

        if (!option.__isNew__) {
            const id = Number(option.value);

            if (isNaN(id)) {
                resolve(null);

                return;
            } //end if

            resolve(id);

            return;
        } //end if

        let requestUrl;

        switch (type) {
            case RecordType.COFFEE:
                requestUrl = "/api/coffee";
                break;
            case RecordType.WATER:
                requestUrl = "/api/water";
                break;
            case RecordType.BREWER:
                requestUrl = "/api/brewer";
                break;
            case RecordType.FILTER:
                requestUrl = "/api/filter";
                break;
            case RecordType.VESSEL:
                requestUrl = "/api/vessel";
                break;
            default:
                resolve(null);
                return;
        } //end switch

        const formData = new FormData();

        formData.append("name", option.value);

        const config = {
            "withCredentials": true,
        };

        const axios = require("axios").default;

        axios.post(requestUrl, formData, config)
             .then((response: AxiosResponse<CreateResponse>) => {
                 if (response.data.status !== "SUCCESS") {
                     resolve(null);

                     return;
                 } //end if

                 const location = response.headers["location"];

                 const url = new URL(location);

                 const searchParameters = new URLSearchParams(url.search);

                 if (!searchParameters.has("id")) {
                     resolve(null);

                     return;
                 } //end if

                 const idString = searchParameters.get("id");

                 const id = Number(idString);

                 if (isNaN(id)) {
                     resolve(null);

                     return;
                 } //end if

                 resolve(id);
             });
    });
} //getRecordPromise

function processResults(results: (number | null)[], coffeeMass: number, waterMass: number,
                        setShowSuccess: (showSuccess: boolean) => void,
                        setShowError: (showError: boolean) => void): void {
    const coffeeId = results[0];

    if (coffeeId === null) {
        setShowError(true);

        return;
    } //end if

    const waterId = results[1];

    if (waterId === null) {
        setShowError(true);

        return;
    } //end if

    const brewerId = results[2];

    if (brewerId === null) {
        setShowError(true);

        return;
    } //end if

    const filterId = results[3];

    if (filterId === null) {
        setShowError(true);

        return;
    } //end if

    const vesselId = results[4];

    if (vesselId === null) {
        setShowError(true);

        return;
    } //end if

    const requestUrl = "/api/brew";

    const formData = new FormData();

    const coffeeIdString = String(coffeeId);

    formData.append("coffeeId", coffeeIdString);

    const waterIdString = String(waterId);

    formData.append("waterId", waterIdString);

    const brewerIdString = String(brewerId);

    formData.append("brewerId", brewerIdString);

    const filterIdString = String(filterId);

    formData.append("filterId", filterIdString);

    const vesselIdString = String(vesselId);

    formData.append("vesselId", vesselIdString);

    const coffeeMassString = String(coffeeMass);

    formData.append("coffeeMass", coffeeMassString);

    const waterMassString = String(waterMass);

    formData.append("waterMass", waterMassString);

    const config = {
        "withCredentials": true,
    };

    const axios = require("axios").default;

    axios.post(requestUrl, formData, config)
         .then((response: AxiosResponse<CreateResponse>) => {
             if (response.data.status !== "SUCCESS") {
                 setShowError(true);

                 return;
             } //end if

             setShowSuccess(true);
         })
         .catch(() => {
             setShowError(true);
         });
} //processResults

function saveBrew(brew: Brew, setShowSuccess: (showSuccess: boolean) => void,
                  setShowError: (showError: boolean) => void): void {
    let dataValid = true;

    if (brew.coffee.value === null) {
        brew.coffee.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (brew.water.value === null) {
        brew.water.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (brew.brewer.value === null) {
        brew.brewer.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (brew.filter.value === null) {
        brew.filter.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (brew.vessel.value === null) {
        brew.vessel.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (isNaN(brew.coffeeMass.value)) {
        brew.coffeeMass.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (isNaN(brew.waterMass.value)) {
        brew.waterMass.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (!dataValid) {
        return;
    } //end if

    const coffeeOption = brew.coffee.value;

    if (coffeeOption === null) {
        return;
    } //end if

    const coffeePromise = getRecordPromise(coffeeOption, RecordType.COFFEE);

    const waterOption = brew.water.value;

    if (waterOption === null) {
        return;
    } //end if

    const waterPromise = getRecordPromise(waterOption, RecordType.WATER);

    const brewerOption = brew.brewer.value;

    if (brewerOption === null) {
        return;
    } //end if

    const brewerPromise = getRecordPromise(brewerOption, RecordType.BREWER);

    const filterOption = brew.filter.value;

    if (filterOption === null) {
        return;
    } //end if

    const filterPromise = getRecordPromise(filterOption, RecordType.FILTER);

    const vesselOption = brew.vessel.value;

    if (vesselOption === null) {
        return;
    } //end if

    const vesselPromise = getRecordPromise(vesselOption, RecordType.VESSEL);

    const coffeeMass = brew.coffeeMass.value;

    const waterMass = brew.waterMass.value;

    const promises = [coffeePromise, waterPromise, brewerPromise, filterPromise, vesselPromise];

    Promise.all(promises)
           .then((results) => processResults(results, coffeeMass, waterMass, setShowSuccess, setShowError));
} //saveBrew

function CreateRecordModal(props: Props) {
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

    const [coffeeMass, setCoffeeMass] = useState(18.0);

    const [showCoffeeMassError, setShowCoffeeMassError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleCoffeeMassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = Number(event.target.value);

        setCoffeeMass(newValue);

        if (isNaN(newValue)) {
            setShowCoffeeMassError({
                "display": "block"
            });

            return;
        } //end if

        setShowCoffeeMassError({
            "display": "none"
        });
    };

    const [waterMass, setWaterMass] = useState(300.0);

    const [showWaterMassError, setShowWaterMassError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleWaterMassChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = Number(event.target.value);

        setWaterMass(newValue);

        if (isNaN(newValue)) {
            setShowWaterMassError({
                "display": "block"
            });

            return;
        } //end if
        
        setShowWaterMassError({
            "display": "none"
        });
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const hideSuccessToast = () => {
        setShowSuccess(false);
    };

    const successMessage = "The specified brew was successfully created.";

    const [showError, setShowError] = useState(false);

    const hideErrorToast = () => {
        setShowError(false);
    };

    const errorMessage = "The specified brew could not be created.";

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

                        props.setShow(false);

                        saveBrew(brew, setShowSuccess, setShowError);
                    }}>
                        Save
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
} //CreateRecordModal

export default CreateRecordModal;