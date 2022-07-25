import React from "react";
import {ReactElement} from "react";
import {ListGroup, Modal} from "react-bootstrap";
import Brew from "./Brew";
import getLocalTimestampString from "../utilities";
import Utilities from "../utilities";

interface Props {
    brew: Brew | null,
    show: boolean,
    setShow: (show: boolean) => void
}

function ReadBrewModal(props: Props): ReactElement {
    if (props.brew === null) {
        return (
            <>
            </>
        );
    } //endif

    const handleHide = () => {
        props.setShow(false);
    };

    const utcTimestamp = new Date(props.brew.timestamp);

    const localTimestampString = Utilities.getLocalTimestampString(utcTimestamp);

    const coffeeMassString = props.brew.coffeeMass.toLocaleString();

    const waterMassString = props.brew.waterMass.toLocaleString();

    return (
        <>
            <Modal show={props.show} onHide={handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Brew Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Timestamp
                            </div>
                            <div>
                                {
                                    localTimestampString
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Coffee
                            </div>
                            <div>
                                {
                                    props.brew.coffee.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Water
                            </div>
                            <div>
                                {
                                    props.brew.water.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Brewer
                            </div>
                            <div>
                                {
                                    props.brew!.brewer.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Filter
                            </div>
                            <div>
                                {
                                    props.brew.filter.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Vessel
                            </div>
                            <div>
                                {
                                    props.brew.vessel.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Coffee Mass
                            </div>
                            <div>
                                {
                                    coffeeMassString
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Water Mass
                            </div>
                            <div>
                                {
                                    waterMassString
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
} //ReadBrewModal

export default ReadBrewModal;