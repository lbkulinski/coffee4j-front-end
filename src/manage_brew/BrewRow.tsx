import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import Brew from "./Brew";
import {LinkContainer} from "react-router-bootstrap";

type Props = {
    brew: Brew
}

function getLocalTimestampString(date: Date): string {
    const offsetMilliseconds = date.getTimezoneOffset() * 60000;

    const localTime = date.getTime() - offsetMilliseconds;

    const localTimestamp = new Date(localTime);

    const month = localTimestamp.getMonth() + 1;

    const maxLength = 2;

    const fillString = "0";

    const monthString = String(month).padStart(maxLength, fillString);

    const day = localTimestamp.getDate();

    const dayString = String(day).padStart(maxLength, fillString);

    const year = localTimestamp.getFullYear();

    const yearMaxLength = 4;

    const yearString = String(year).padStart(yearMaxLength, fillString);

    const hours = localTimestamp.getHours();

    const amPm = (hours < 12) ? "AM" : "PM";

    const amPmHours = (hours <= 12) ? hours : (hours - 12);

    const hoursString = String(amPmHours).padStart(maxLength, fillString);

    const minutes = localTimestamp.getMinutes();

    const minutesString = String(minutes).padStart(maxLength, fillString);

    return `${monthString}/${dayString}/${yearString} ${hoursString}:${minutesString} ${amPm}`;
} //getDateString

function BrewRow(props: Props) {
    const utcTimestamp = new Date(props.brew.timestamp);

    const localTimestampString = getLocalTimestampString(utcTimestamp);

    return (
        <tr>
            <td>
                {
                    localTimestampString
                }
            </td>
            {/*
            <td>
                {
                    props.brew.coffee.name
                }
            </td>
            <td>
                {
                    props.brew.water.name
                }
            </td>
            <td>
                {
                    props.brew.brewer.name
                }
            </td>
            <td>
                {
                    props.brew.filter.name
                }
            </td>
            <td>
                {
                    props.brew.vessel.name
                }
            </td>
            <td>
                {
                    props.brew.coffeeMass.toLocaleString(undefined, {
                        "maximumFractionDigits": 2
                    })
                }
            </td>
            <td>
                {
                    props.brew.waterMass.toLocaleString(undefined, {
                        "maximumFractionDigits": 2
                    })
                }
            </td>
            */}
            <td>
                <Container>
                    <Row>
                        <Col xs="1">
                            <LinkContainer to="/detail">
                                <a>
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                            </LinkContainer>
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