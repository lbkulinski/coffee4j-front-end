import React, {CSSProperties, ReactNode, useState} from "react";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AsyncCreatableSelect from "react-select/async-creatable";
import {AxiosResponse} from "axios";
import {SingleValue} from "react-select";
import RecordType from "../manage_record/RecordType";
import Brew from "./Brew";
import loadBrews from "./loadBrews";
import {Option, loadOptions, getRecordPromise} from "./loadOptions";
import {DateTime} from "luxon";

/*
interface UpdateResponse {
    status: string,
    content: string
}

interface UpdateBrewValues {
    id: number,
    timestamp: {
        value: string,
        setShowError: (showError: CSSProperties) => void
    },
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

function processResults(results: (number | null)[], id: number, timestamp: string, coffeeMass: number,
                        waterMass: number, setShowSuccess: (showSuccess: boolean) => void,
                        setShowError: (showError: boolean) => void, setOffsetIds: (offsetIds: number[]) => void,
                        setNextDisabled: (nextDisabled: boolean) => void, setBrews: (brews: Brew[]) => void): void {
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

    const idString = String(id);

    formData.append("id", idString);

    formData.append("timestamp", timestamp);

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

    axios.put(requestUrl, formData, config)
         .then((response: AxiosResponse<UpdateResponse>) => {
             if (response.data.status !== "SUCCESS") {
                 setShowError(true);

                 return;
             } //end if

             const offsetIds: number[] = [];

             loadBrews(offsetIds, setOffsetIds, setNextDisabled, setBrews);

             setShowSuccess(true);
         })
         .catch(() => {
             setShowError(true);
         });
} //processResults

function saveBrew(updateBrewValues: UpdateBrewValues, setShow: (show: boolean) => void,
                  setShowSuccess: (showSuccess: boolean) => void,
                  setShowError: (showError: boolean) => void, props: Props): void {
    let dataValid = true;

    if (updateBrewValues.timestamp.value === "") {
        updateBrewValues.timestamp.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (updateBrewValues.coffee.value === null) {
        updateBrewValues.coffee.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (updateBrewValues.water.value === null) {
        updateBrewValues.water.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (updateBrewValues.brewer.value === null) {
        updateBrewValues.brewer.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (updateBrewValues.filter.value === null) {
        updateBrewValues.filter.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (updateBrewValues.vessel.value === null) {
        updateBrewValues.vessel.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (isNaN(updateBrewValues.coffeeMass.value)) {
        updateBrewValues.coffeeMass.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (isNaN(updateBrewValues.waterMass.value)) {
        updateBrewValues.waterMass.setShowError({
            "display": "block"
        });

        dataValid = false;
    } //end if

    if (!dataValid) {
        return;
    } //end if

    setShow(false);

    const coffeeOption = updateBrewValues.coffee.value;

    if (coffeeOption === null) {
        setShowError(true);

        return;
    } //end if

    const coffeePromise = getRecordPromise(coffeeOption, RecordType.COFFEE);

    const waterOption = updateBrewValues.water.value;

    if (waterOption === null) {
        setShowError(true);

        return;
    } //end if

    const waterPromise = getRecordPromise(waterOption, RecordType.WATER);

    const brewerOption = updateBrewValues.brewer.value;

    if (brewerOption === null) {
        setShowError(true);

        return;
    } //end if

    const brewerPromise = getRecordPromise(brewerOption, RecordType.BREWER);

    const filterOption = updateBrewValues.filter.value;

    if (filterOption === null) {
        setShowError(true);

        return;
    } //end if

    const filterPromise = getRecordPromise(filterOption, RecordType.FILTER);

    const vesselOption = updateBrewValues.vessel.value;

    if (vesselOption === null) {
        setShowError(true);

        return;
    } //end if

    const vesselPromise = getRecordPromise(vesselOption, RecordType.VESSEL);

    const id = updateBrewValues.id;

    const timestamp = updateBrewValues.timestamp.value;

    const coffeeMass = updateBrewValues.coffeeMass.value;

    const waterMass = updateBrewValues.waterMass.value;

    const promises = [coffeePromise, waterPromise, brewerPromise, filterPromise, vesselPromise];

    Promise.all(promises)
           .then((results) => processResults(results, id, timestamp, coffeeMass, waterMass, setShowSuccess,
                                                 setShowError, props.setOffsetIds, props.setNextDisabled,
                                                 props.setBrews));
} //saveBrew

function UpdateBrewModal(props: Props) {
    if (props.brew === null) {
        return (
            <>
            </>
        );
    } //endif

    const id = props.brew.id;

    const options = {
        "zone": "utc"
    };

    const format = "yyyy-LL-dd'T'HH:mm";

    const defaultTimestamp = DateTime.fromISO(props.brew.timestamp, options)
                                     .toLocal()
                                     .toFormat(format);

    const [timestamp, setTimestamp] = useState(defaultTimestamp);

    const [showTimestampError, setShowTimestampError] = useState<CSSProperties>({
        "display": "none"
    });

    const handleTimestampChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const timestamp = DateTime.fromISO(event.target.value)
                                  .toUTC()
                                  .toString();

        const invalidDateTime = "Invalid DateTime";

        if (timestamp === invalidDateTime) {
            setTimestamp("");

            setShowTimestampError({
                "display": "block"
            });

            return;
        } //end if

        setTimestamp(timestamp);

        setShowTimestampError({
            "display": "none"
        });
    };

    const coffeeValue = String(props.brew.coffee.id);

    const defaultCoffee = {
        "value": coffeeValue,
        "label": props.brew.coffee.name,
        "__isNew__": false
    };

    const [coffee, setCoffee] = useState<Option | null>(defaultCoffee);

    const [showCoffeeError, setShowCoffeeError] = useState<CSSProperties>({
        "display": "none"
    });

    const loadCoffeeOptions = (searchTerm: string) => loadOptions(RecordType.COFFEE, searchTerm);

    const handleCoffeeChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setCoffee(newValue);
        
        setShowCoffeeError({
            "display": "none"
        });
    };

    const waterValue = String(props.brew.water.id);

    const defaultWater = {
        "value": waterValue,
        "label": props.brew.water.name,
        "__isNew__": false
    };

    const [water, setWater] = useState<Option | null>(defaultWater);

    const [showWaterError, setShowWaterError] = useState<CSSProperties>({
        "display": "none"
    });

    const loadWaterOptions = (searchTerm: string) => loadOptions(RecordType.WATER, searchTerm);

    const handleWaterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

       setWater(newValue);
        
        setShowWaterError({
            "display": "none"
        });
    };

    const brewerValue = String(props.brew.brewer.id);

    const defaultBrewer = {
        "value": brewerValue,
        "label": props.brew.brewer.name,
        "__isNew__": false
    };

    const [brewer, setBrewer] = useState<Option | null>(defaultBrewer);

    const [showBrewerError, setShowBrewerError] = useState<CSSProperties>({
        "display": "none"
    });

    const loadBrewerOptions = (searchTerm: string) => loadOptions(RecordType.BREWER, searchTerm);

    const handleBrewerChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setBrewer(newValue);
        
        setShowBrewerError({
            "display": "none"
        });
    };

    const filterValue = String(props.brew.filter.id);

    const defaultFilter = {
        "value": filterValue,
        "label": props.brew.filter.name,
        "__isNew__": false
    };

    const [filter, setFilter] = useState<Option | null>(defaultFilter);

    const [showFilterError, setShowFilterError] = useState<CSSProperties>({
        "display": "none"
    });

    const loadFilterOptions = (searchTerm: string) => loadOptions(RecordType.FILTER, searchTerm);

    const handleFilterChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setFilter(newValue);
        
        setShowFilterError({
            "display": "none"
        });
    };

    const vesselValue = String(props.brew.vessel.id);

    const defaultVessel = {
        "value": vesselValue,
        "label": props.brew.vessel.name,
        "__isNew__": false
    };

    const [vessel, setVessel] = useState<Option | null>(defaultVessel);

    const [showVesselError, setShowVesselError] = useState<CSSProperties>({
        "display": "none"
    });

    const loadVesselOptions = (searchTerm: string) => loadOptions(RecordType.VESSEL, searchTerm);

    const handleVesselChange = (newValue: SingleValue<Option>) => {
        if (newValue === null) {
            return;
        } //end if

        setVessel(newValue);

        setShowVesselError({
            "display": "none"
        });
    };

    const [coffeeMass, setCoffeeMass] = useState(props.brew.coffeeMass);

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

    const [waterMass, setWaterMass] = useState(props.brew.waterMass);

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

    const hideModal = () => {
        props.setShow(false);

        setCoffee(null);

        setShowCoffeeError({
            "display": "none"
        });

        setWater(null);

        setShowWaterError({
            "display": "none"
        });

        setBrewer(null);

        setShowBrewerError({
            "display": "none"
        });

        setFilter(null);

        setShowFilterError({
            "display": "none"
        });

        setVessel(null);

        setShowVesselError({
            "display": "none"
        });

        const defaultCoffeeMass = 18;

        setCoffeeMass(defaultCoffeeMass);

        setShowCoffeeMassError({
            "display": "none"
        });

        const defaultWaterMass = 300;

        setWaterMass(defaultWaterMass);

        setShowWaterMassError({
            "display": "none"
        });
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const hideSuccessToast = () => setShowSuccess(false);

    const successMessage = "The specified brew was successfully updated.";

    const [showError, setShowError] = useState(false);

    const hideErrorToast = () => setShowError(false);

    const errorMessage = "The specified brew could not be updated.";

    const handleClose = () => props.setShow(false);

    const handleSave = () => {
        const updateBrewValues: UpdateBrewValues = {
            "id": id,
            "timestamp": {
                "value": timestamp,
                "setShowError": setShowTimestampError
            },
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

        saveBrew(updateBrewValues, props.setShow, setShowSuccess, setShowError, props);
    };

    return (
        <>
            <Modal show={props.show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Timestamp
                        </Form.Label>
                        <Form.Control type="datetime-local" onChange={handleTimestampChange}
                                      defaultValue={defaultTimestamp} />
                        <Form.Control.Feedback type="invalid" style={showTimestampError}>
                            Please enter a valid timestamp.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Coffee
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadCoffeeOptions} defaultOptions={true}
                                              onChange={handleCoffeeChange} defaultValue={defaultCoffee} />
                        <Form.Control.Feedback type="invalid" style={showCoffeeError}>
                            Please select a coffee.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadWaterOptions} defaultOptions={true}
                                              onChange={handleWaterChange} defaultValue={defaultWater} />
                        <Form.Control.Feedback type="invalid" style={showWaterError}>
                            Please select a water.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Brewer
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadBrewerOptions} defaultOptions={true}
                                              onChange={handleBrewerChange} defaultValue={defaultBrewer} />
                        <Form.Control.Feedback type="invalid" style={showBrewerError}>
                            Please select a brewer.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Filter
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadFilterOptions} defaultOptions={true}
                                              onChange={handleFilterChange} defaultValue={defaultFilter} />
                        <Form.Control.Feedback type="invalid" style={showFilterError}>
                            Please select a filter.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Vessel
                        </Form.Label>
                        <AsyncCreatableSelect cacheOptions loadOptions={loadVesselOptions} defaultOptions={true}
                                              onChange={handleVesselChange} defaultValue={defaultVessel} />
                        <Form.Control.Feedback type="invalid" style={showVesselError}>
                            Please select a vessel.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Coffee Mass
                        </Form.Label>
                        <Form.Control type="text" onChange={handleCoffeeMassChange}
                                      defaultValue={props.brew.coffeeMass} />
                        <Form.Control.Feedback type="invalid" style={showCoffeeMassError}>
                            Please enter a valid coffee mass.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Water Mass
                        </Form.Label>
                        <Form.Control type="text" onChange={handleWaterMassChange}
                                      defaultValue={props.brew.waterMass} />
                        <Form.Control.Feedback type="invalid" style={showWaterMassError}>
                            Please enter a valid water mass.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={handleSave}>
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
} //UpdateBrewModal
*/

interface Props {
    brew: Brew | null,
    show: boolean,
    setShow: (show: boolean) => void,
    setOffsetIds: (offsetIds: number[]) => void,
    setNextDisabled: (nextDisabled: boolean) => void,
    setBrews: (brews: Brew[]) => void
}

interface State {
    id: number | null,
    timestamp: string | null,
    showTimestampError: CSSProperties,
    coffee: Option | null,
    showCoffeeError: CSSProperties,
    water: Option | null,
    showWaterError: CSSProperties,
    brewer: Option | null,
    showBrewerError: CSSProperties,
    filter: Option | null,
    showFilterError: CSSProperties,
    vessel: Option | null,
    showVesselError: CSSProperties,
    coffeeMass: number | null,
    showCoffeeMassError: CSSProperties,
    waterMass: number | null,
    showWaterMassError: CSSProperties
}

class UpdateBrewModal extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            "id": null,
            "timestamp": null,
            "showTimestampError": {
                "display": "none"
            },
            "coffee": null,
            "showCoffeeError": {
                "display": "none"
            },
            "water": null,
            "showWaterError": {
                "display": "none"
            },
            "brewer": null,
            "showBrewerError": {
                "display": "none"
            },
            "filter": null,
            "showFilterError": {
                "display": "none"
            },
            "vessel": null,
            "showVesselError": {
                "display": "none"
            },
            "coffeeMass": null,
            "showCoffeeMassError": {
                "display": "none"
            },
            "waterMass": null,
            "showWaterMassError": {
                "display": "none"
            }
        };
    } //constructor

    public hideModal(): void {
        this.props.setShow(false);

        this.setState({
            "coffee": null,
            "showCoffeeError": {
                "display": "none"
            },
            "water": null,
            "showWaterError": {
                "display": "none"
            },
            "brewer": null,
            "showBrewerError": {
                "display": "none"
            },
            "filter": null,
            "showFilterError": {
                "display": "none"
            },
            "vessel": null,
            "showVesselError": {
                "display": "none"
            },
            "coffeeMass": 0,
            "showCoffeeMassError": {
                "display": "none"
            },
            "waterMass": 0,
            "showWaterMassError": {
                "display": "none"
            }
        });
    } //hideModal

    public handleTimestampChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const timestamp = DateTime.fromISO(event.target.value)
                                  .toUTC()
                                  .toString();

        const invalidDateTime = "Invalid DateTime";

        if (timestamp === invalidDateTime) {
            this.setState({
                "timestamp": "",
                "showTimestampError": {
                    "display": "block"
                }
            });

            return;
        } //end if

        this.setState({
            "timestamp": timestamp,
            "showTimestampError": {
                "display": "none"
            }
        });
    } //handleTimestampChange

    public loadCoffeeOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.COFFEE, searchTerm);
    } //loadCoffeeOptions

    public handleCoffeeChange(newValue: SingleValue<Option>): void {
        if (newValue === null) {
            return;
        } //end if

        this.setState({
            "coffee": newValue,
            "showCoffeeError": {
                "display": "none"
            }
        });
    } //handleCoffeeChange

    public loadWaterOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.WATER, searchTerm);
    } //loadWaterOptions

    public handleWaterChange(newValue: SingleValue<Option>): void {
        if (newValue === null) {
            return;
        } //end if

        this.setState({
            "water": newValue,
            "showWaterError": {
                "display": "none"
            }
        });
    } //handleWaterChange

    public loadBrewerOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.BREWER, searchTerm);
    } //loadBrewerOptions

    public handleBrewerChange(newValue: SingleValue<Option>): void {
        if (newValue === null) {
            return;
        } //end if

        this.setState({
            "brewer": newValue,
            "showBrewerError": {
                "display": "none"
            }
        });
    } //handleBrewerChange

    public loadFilterOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.FILTER, searchTerm);
    } //loadFilterOptions

    public handleFilterChange(newValue: SingleValue<Option>): void {
        if (newValue === null) {
            return;
        } //end if

        this.setState({
            "filter": newValue,
            "showFilterError": {
                "display": "none"
            }
        });
    } //handleFilterChange

    public loadVesselOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.VESSEL, searchTerm);
    } //loadVesselOptions

    public handleVesselChange(newValue: SingleValue<Option>): void {
        if (newValue === null) {
            return;
        } //end if

        this.setState({
            "vessel": newValue,
            "showVesselError": {
                "display": "none"
            }
        });
    } //handleVesselChange

    public handleCoffeeMassChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const newValue = Number(event.target.value);

        let showCoffeeMassError;

        if (isNaN(newValue)) {
            showCoffeeMassError = {
                "display": "block"
            };
        } else {
            showCoffeeMassError = {
                "display": "none"
            };
        } //end if

        this.setState({
            "coffeeMass": newValue,
            "showCoffeeMassError": showCoffeeMassError
        });
    } //handleCoffeeMassChange

    public handleWaterMassChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const newValue = Number(event.target.value);

        let showWaterMassError;

        if (isNaN(newValue)) {
            showWaterMassError = {
                "display": "block"
            };
        } else {
            showWaterMassError = {
                "display": "none"
            };
        } //end if

        this.setState({
            "waterMass": newValue,
            "showWaterMassError": showWaterMassError
        });
    } //handleWaterMassChange

    public handleClose(): void {
        this.props.setShow(false);
    } //handleClose

    public handleSave(): void {
    } //handleSave

    public render(): ReactNode {
        const brew = this.props.brew;

        if (brew === null) {
            return (
                <></>
            );
        } //end if

        const options = {
            "zone": "utc"
        };

        const format = "yyyy-LL-dd'T'HH:mm";

        const timestamp = DateTime.fromISO(brew.timestamp, options)
                                  .toLocal()
                                  .toFormat(format);

        const coffeeValue = String(brew.coffee.id);

        const coffee: Option = {
            "value": coffeeValue,
            "label": brew.coffee.name,
            "__isNew__": false
        };

        const waterValue = String(brew.water.id);

        const water: Option = {
            "value": waterValue,
            "label": brew.water.name,
            "__isNew__": false
        };

        const brewerValue = String(brew.brewer.id);

        const brewer: Option = {
            "value": brewerValue,
            "label": brew.brewer.name,
            "__isNew__": false
        };

        const filterValue = String(brew.filter.id);

        const filter: Option = {
            "value": filterValue,
            "label": brew.filter.name,
            "__isNew__": false
        };

        const vesselValue = String(brew.vessel.id);

        const vessel: Option = {
            "value": vesselValue,
            "label": brew.vessel.name,
            "__isNew__": false
        };

        return (
            <>
                <Modal show={this.props.show} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Update
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Timestamp
                            </Form.Label>
                            <Form.Control type="datetime-local" onChange={this.handleTimestampChange}
                                          defaultValue={timestamp} />
                            <Form.Control.Feedback type="invalid" style={this.state.showTimestampError}>
                                Please enter a valid timestamp.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Coffee
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadCoffeeOptions}
                                                  defaultOptions={true} onChange={this.handleCoffeeChange}
                                                  defaultValue={coffee} />
                            <Form.Control.Feedback type="invalid" style={this.state.showCoffeeError}>
                                Please select a coffee.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Water
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadWaterOptions}
                                                  defaultOptions={true} onChange={this.handleWaterChange}
                                                  defaultValue={water} />
                            <Form.Control.Feedback type="invalid" style={this.state.showWaterError}>
                                Please select a water.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Brewer
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadBrewerOptions}
                                                  defaultOptions={true} onChange={this.handleBrewerChange}
                                                  defaultValue={brewer} />
                            <Form.Control.Feedback type="invalid" style={this.state.showBrewerError}>
                                Please select a brewer.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Filter
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadFilterOptions}
                                                  defaultOptions={true} onChange={this.handleFilterChange}
                                                  defaultValue={filter} />
                            <Form.Control.Feedback type="invalid" style={this.state.showFilterError}>
                                Please select a filter.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Vessel
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadVesselOptions}
                                                  defaultOptions={true} onChange={this.handleVesselChange}
                                                  defaultValue={vessel} />
                            <Form.Control.Feedback type="invalid" style={this.state.showVesselError}>
                                Please select a vessel.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Coffee Mass
                            </Form.Label>
                            <Form.Control type="text" onChange={this.handleCoffeeMassChange}
                                          defaultValue={brew.coffeeMass} />
                            <Form.Control.Feedback type="invalid" style={this.state.showCoffeeMassError}>
                                Please enter a valid coffee mass.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Water Mass
                            </Form.Label>
                            <Form.Control type="text" onChange={this.handleWaterMassChange}
                                          defaultValue={brew.waterMass} />
                            <Form.Control.Feedback type="invalid" style={this.state.showWaterMassError}>
                                Please enter a valid water mass.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="outline-primary" onClick={this.handleSave}>
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
    } //render
} //UpdateBrewModal

export default UpdateBrewModal;