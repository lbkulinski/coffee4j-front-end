import React from "react";
import {ReactElement} from "react";
import {ListGroup, Modal} from "react-bootstrap";
import Brew from "./Brew";

interface Props {
    show: boolean,
    setShow: (show: boolean) => void,
    brew: Brew
}

function ReadBrewModal(props: Props): ReactElement {
    const handleHide = () => {
        props.setShow(false);
    };

    const coffeeMassString = props.brew.coffeeMass.toLocaleString();

    const waterMassString = props.brew.waterMass.toLocaleString();

    return (
        <>
            <Modal show={props.show} onHide={handleHide}>
                <Modal.Header>
                    <Modal.Title>
                        Brew Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Coffee
                            </div>
                            {
                                props.brew.coffee.name
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Water
                            </div>
                            {
                                props.brew.water.name
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Brewer
                            </div>
                            {
                                props.brew.brewer.name
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Filter
                            </div>
                            {
                                props.brew.filter.name
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Vessel
                            </div>
                            {
                                props.brew.vessel.name
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Coffee Mass
                            </div>
                            {
                                coffeeMassString
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Water Mass
                            </div>
                            {
                                waterMassString
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
} //ReadBrewModal

export default ReadBrewModal;