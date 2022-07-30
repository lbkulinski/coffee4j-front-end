import React, {CSSProperties, ReactElement, ReactNode, useState} from "react";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AsyncCreatableSelect from "react-select/async-creatable";
import {AxiosResponse, default as axios} from "axios";
import {SingleValue} from "react-select";
import RecordType from "../manage_record/RecordType";
import Brew from "./Brew";
import loadBrews from "./loadBrews";
import {Option, loadOptions, getRecordPromise} from "./loadOptions";
import {DateTime} from "luxon";

interface CreateResponse {
    status: string,
    content: string
}

interface Props {
    show: boolean,
    setShow: (show: boolean) => void,
    setOffsetIds: (offsetIds: number[]) => void,
    setNextDisabled: (nextDisabled: boolean) => void,
    setBrews: (brews: Brew[]) => void
}

interface State {
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
    coffeeMass: number,
    showCoffeeMassError: CSSProperties,
    waterMass: number,
    showWaterMassError: CSSProperties,
    showSuccess: boolean,
    showError: boolean
}

class CreateBrewModal extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
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
            "coffeeMass": 18,
            "showCoffeeMassError": {
                "display": "none"
            },
            "waterMass": 300,
            "showWaterMassError": {
                "display": "none"
            },
            "showSuccess": false,
            "showError": false
        };

        this.hideModal = this.hideModal.bind(this);

        this.loadCoffeeOptions = this.loadCoffeeOptions.bind(this);

        this.handleCoffeeChange = this.handleCoffeeChange.bind(this);

        this.loadWaterOptions = this.loadWaterOptions.bind(this);

        this.handleWaterChange = this.handleWaterChange.bind(this);

        this.loadBrewerOptions = this.loadBrewerOptions.bind(this);

        this.handleBrewerChange = this.handleBrewerChange.bind(this);

        this.loadFilterOptions = this.loadFilterOptions.bind(this);

        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.loadVesselOptions = this.loadVesselOptions.bind(this);

        this.handleVesselChange = this.handleVesselChange.bind(this);

        this.handleCoffeeMassChange = this.handleCoffeeMassChange.bind(this);

        this.handleWaterMassChange = this.handleWaterMassChange.bind(this);

        this.handleClose = this.handleClose.bind(this);

        this.handleResults = this.handleResults.bind(this);

        this.handleSave = this.handleSave.bind(this);

        this.hideSuccessToast = this.hideSuccessToast.bind(this);

        this.hideErrorToast = this.hideErrorToast.bind(this);
    } //constructor

    private hideModal(): void {
        this.props.setShow(false);
    } //hideModal

    private loadCoffeeOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.COFFEE, searchTerm);
    } //loadCoffeeOptions

    private handleCoffeeChange(newValue: SingleValue<Option>): void {
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

    private loadWaterOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.WATER, searchTerm);
    } //loadWaterOptions

    private handleWaterChange(newValue: SingleValue<Option>): void {
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

    private loadBrewerOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.BREWER, searchTerm);
    } //loadBrewerOptions

    private handleBrewerChange(newValue: SingleValue<Option>): void {
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

    private loadFilterOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.FILTER, searchTerm);
    } //loadFilterOptions

    private handleFilterChange(newValue: SingleValue<Option>): void {
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

    private loadVesselOptions(searchTerm: string): Promise<Option[]> {
        return loadOptions(RecordType.VESSEL, searchTerm);
    } //loadVesselOptions

    private handleVesselChange(newValue: SingleValue<Option>): void {
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

    private handleCoffeeMassChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
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

    private handleWaterMassChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
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

    private handleClose(): void {
        this.props.setShow(false);
    } //handleClose

    private handleResults(results: (number | null)[]): void {
        const format = "yyyy-LL-dd'T'HH:mm:ss'.'u'Z'";

        const timestamp = DateTime.utc()
                                  .toFormat(format);

        const coffeeId = results[0];

        if (coffeeId === null) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        const waterId = results[1];

        if (waterId === null) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        const brewerId = results[2];

        if (brewerId === null) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        const filterId = results[3];

        if (filterId === null) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        const vesselId = results[4];

        if (vesselId === null) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        if ((this.state.coffeeMass === null) || isNaN(this.state.coffeeMass)) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        if ((this.state.waterMass === null) || isNaN(this.state.waterMass)) {
            this.setState({
                "showError": true
            });

            return;
        } //end if

        const requestUrl = "/api/brew";

        const data = {
            "timestamp": timestamp,
            "coffeeId": coffeeId,
            "waterId": waterId,
            "brewerId": brewerId,
            "filterId": filterId,
            "vesselId": vesselId,
            "coffeeMass": this.state.coffeeMass,
            "waterMass": this.state.waterMass
        };

        const formData = new FormData();

        Object.entries(data)
              .forEach(([key, value]) => {
                  const valueString = String(value);

                  formData.append(key, valueString);
              });

        const config = {
            "withCredentials": true,
        };

        const axios = require("axios").default;

        axios.post(requestUrl, formData, config)
             .then((response: AxiosResponse<CreateResponse>) => {
                 if (response.data.status !== "SUCCESS") {
                     this.setState({
                         "showError": true
                     });

                     return;
                 } //end if

                 const offsetIds: number[] = [];

                 loadBrews(offsetIds, this.props.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);

                 this.setState({
                     "showSuccess": true
                 });
             })
             .catch(() => {
                 this.setState({
                     "showError": true
                 });
             });
    } //handleResults

    private handleSave(): void {
        let dataValid = true;

        if (this.state.coffee === null) {
            this.setState({
                "showCoffeeError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if (this.state.water === null) {
            this.setState({
                "showWaterError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if (this.state.brewer === null) {
            this.setState({
                "showBrewerError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if (this.state.filter === null) {
            this.setState({
                "showFilterError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if (this.state.vessel === null) {
            this.setState({
                "showVesselError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if ((this.state.coffeeMass === null) || isNaN(this.state.coffeeMass)) {
            this.setState({
                "showCoffeeMassError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if ((this.state.waterMass === null) || isNaN(this.state.waterMass)) {
            this.setState({
                "showWaterMassError": {
                    "display": "block"
                }
            });

            dataValid = false;
        } //end if

        if (!dataValid) {
            return;
        } //end if

        this.props.setShow(false);

        const coffeePromise = getRecordPromise(this.state.coffee!, RecordType.COFFEE);

        const waterPromise = getRecordPromise(this.state.water!, RecordType.WATER);

        const brewerPromise = getRecordPromise(this.state.brewer!, RecordType.BREWER);

        const filterPromise = getRecordPromise(this.state.filter!, RecordType.FILTER);

        const vesselPromise = getRecordPromise(this.state.vessel!, RecordType.VESSEL);

        const promises = [coffeePromise, waterPromise, brewerPromise, filterPromise, vesselPromise];

        Promise.all(promises)
               .then(this.handleResults);
    } //handleSave

    private hideSuccessToast(): void {
        this.setState({
            "showSuccess": false
        });
    } //hideSuccessToast

    private hideErrorToast(): void {
        this.setState({
            "showError": false
        });
    } //hideErrorToast

    public render(): ReactNode {
        return (
            <>
                <Modal show={this.props.show} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Create
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Coffee
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadCoffeeOptions}
                                                  defaultOptions={true} onChange={this.handleCoffeeChange} />
                            <Form.Control.Feedback type="invalid" style={this.state.showCoffeeError}>
                                Please select a coffee.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Water
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadWaterOptions}
                                                  defaultOptions={true} onChange={this.handleWaterChange} />
                            <Form.Control.Feedback type="invalid" style={this.state.showWaterError}>
                                Please select a water.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Brewer
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadBrewerOptions}
                                                  defaultOptions={true} onChange={this.handleBrewerChange} />
                            <Form.Control.Feedback type="invalid" style={this.state.showBrewerError}>
                                Please select a brewer.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Filter
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadFilterOptions}
                                                  defaultOptions={true} onChange={this.handleFilterChange} />
                            <Form.Control.Feedback type="invalid" style={this.state.showFilterError}>
                                Please select a filter.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Vessel
                            </Form.Label>
                            <AsyncCreatableSelect cacheOptions loadOptions={this.loadVesselOptions}
                                                  defaultOptions={true} onChange={this.handleVesselChange} />
                            <Form.Control.Feedback type="invalid" style={this.state.showVesselError}>
                                Please select a vessel.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Coffee Mass
                            </Form.Label>
                            <Form.Control type="text" defaultValue="18" onChange={this.handleCoffeeMassChange} />
                            <Form.Control.Feedback type="invalid" style={this.state.showCoffeeMassError}>
                                Please enter a valid coffee mass.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Water Mass
                            </Form.Label>
                            <Form.Control type="text" defaultValue="300" onChange={this.handleWaterMassChange} />
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
                <ToastContainer className="p-3" position="top-end">
                    <Toast show={this.state.showSuccess} onClose={this.hideSuccessToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">
                                Coffee4j
                            </strong>
                        </Toast.Header>
                        <Toast.Body>
                            The specified brew was successfully created.
                        </Toast.Body>
                    </Toast>
                    <Toast show={this.state.showError} onClose={this.hideErrorToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">
                                Coffee4j
                            </strong>
                        </Toast.Header>
                        <Toast.Body>
                            The specified brew could not be created. Please try again later.
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        );
    } //render
}

export default CreateBrewModal;