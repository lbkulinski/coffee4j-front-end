import React from 'react';
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

function BrewRow(props: Props) {
    const timeZone = {
        "zone": "utc"
    };

    const timestampString = DateTime.fromISO(props.brew.timestamp, timeZone)
                                    .toLocal()
                                    .toLocaleString(DateTime.DATETIME_SHORT);

    const handleReadClick = () => {
        props.setBrew(props.brew);

        props.setReadShow(true);
    };

    const handleUpdateClick = () => {
        props.setBrew(props.brew);

        props.setUpdateShow(true);
    };

    return (
        <tr>
            <td>
                {
                    timestampString
                }
            </td>
            <td>
                <Container>
                    <Row>
                        <Col xs="1">
                            <a onClick={handleReadClick}>
                                <FontAwesomeIcon icon={faEye} />
                            </a>
                        </Col>
                        <Col xs="1">
                            <a onClick={handleUpdateClick}>
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
} //BrewRow

export default BrewRow;