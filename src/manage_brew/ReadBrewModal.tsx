import React, {ReactNode} from "react";
import {ListGroup, Modal} from "react-bootstrap";
import Brew from "./Brew";
import {DateTime} from "luxon";

interface Props {
    brew: Brew,
    show: boolean,
    setShow: (show: boolean) => void
}

interface State {
}

class ReadBrewModal extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
        };

        this.handleHide = this.handleHide.bind(this);
    } //constructor

    private handleHide(): void {
        this.props.setShow(false);
    } //handleHide

    public render(): ReactNode {
        const options = {
            "zone": "utc"
        };

        const timestamp = DateTime.fromISO(this.props.brew.timestamp, options)
                                  .toLocal()
                                  .toLocaleString(DateTime.DATETIME_SHORT);

        const coffeeMass = this.props.brew.coffeeMass.toLocaleString();

        const waterMass = this.props.brew.waterMass.toLocaleString();

        return (
            <Modal show={this.props.show} onHide={this.handleHide}>
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
                                    timestamp
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Coffee
                            </div>
                            <div>
                                {
                                    this.props.brew.coffee.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Water
                            </div>
                            <div>
                                {
                                    this.props.brew.water.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Brewer
                            </div>
                            <div>
                                {
                                    this.props.brew!.brewer.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Filter
                            </div>
                            <div>
                                {
                                    this.props.brew.filter.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Vessel
                            </div>
                            <div>
                                {
                                    this.props.brew.vessel.name
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Coffee Mass
                            </div>
                            <div>
                                {
                                    coffeeMass
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="fw-bold">
                                Water Mass
                            </div>
                            <div>
                                {
                                    waterMass
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        );
    } //render
}

export default ReadBrewModal;