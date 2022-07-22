import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ListGroup} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Brew from "./Brew";

interface Props {
    brew: Brew
}

function BrewDetailCard(props: Props) {
    const coffeeMassString = props.brew.coffeeMass.toLocaleString();

    const waterMassString = props.brew.waterMass.toLocaleString();

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Brew Detail
                </Card.Title>
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
            </Card.Body>
        </Card>
    );
} //BrewDetailCard

export default BrewDetailCard;