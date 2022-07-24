import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import Brew from "./Brew";
import {LinkContainer} from "react-router-bootstrap";
import getLocalTimestampString from "../utilities";

type Props = {
    brew: Brew,
    setBrew: (brew: Brew) => void,
    setReadShow: (show: boolean) => void
}

function BrewRow(props: Props) {
    const utcTimestamp = new Date(props.brew.timestamp);

    const localTimestampString = getLocalTimestampString(utcTimestamp);

    const handleReadClick = () => {
        props.setBrew(props.brew);

        props.setReadShow(true);
    };

    return (
        <tr>
            <td>
                {
                    localTimestampString
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
                            <a>
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