import React, {ReactNode} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import Brew from "./Brew";
import {DateTime} from "luxon";

interface Props {
    brew: Brew,
    setBrew: (brew: Brew) => void,
    setReadShow: (show: boolean) => void,
    setUpdateShow: (show: boolean) => void
}

interface State {
}

class BrewRow extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
        };

        this.handleReadClick = this.handleReadClick.bind(this);

        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    } //constructor

    private handleReadClick(): void {
        this.props.setBrew(this.props.brew);

        this.props.setReadShow(true);
    } //handleReadClick

    private handleUpdateClick(): void {
        this.props.setBrew(this.props.brew);

        this.props.setUpdateShow(true);
    } //handleUpdateClick

    public render(): ReactNode {
        const timeZone = {
            "zone": "utc"
        };

        const timestamp = DateTime.fromISO(this.props.brew.timestamp, timeZone)
                                  .toLocal()
                                  .toLocaleString(DateTime.DATETIME_SHORT);

        return (
            <tr>
                <td>
                    {
                        timestamp
                    }
                </td>
                <td>
                    <Container>
                        <Row>
                            <Col xs="1">
                                <a onClick={this.handleReadClick}>
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                            </Col>
                            <Col xs="1">
                                <a onClick={this.handleUpdateClick}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                            </Col>
                            <Col xs="1">
                                <a>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </td>
            </tr>
        );
    } //render
}

export default BrewRow;