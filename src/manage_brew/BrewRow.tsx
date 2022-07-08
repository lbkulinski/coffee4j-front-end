import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-regular-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import Brew from "./Brew";

type Props = {
    brew: Brew
}

function BrewRow(props: Props) {
    const utcTimestamp = new Date(props.brew.timestamp);

    const offsetMilliseconds = utcTimestamp.getTimezoneOffset() * 60000;

    const localTime = utcTimestamp.getTime() - offsetMilliseconds;

    const localTimestamp = new Date(localTime);

    const locale = "en-US";

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        hour12: true,
        minute: "2-digit"
    };

    const format = new Intl.DateTimeFormat(locale, options);

    const localTimestampString = format.format(localTimestamp);

    return (
        <tr>
            <td>
                {
                    localTimestampString
                }
            </td>
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
                <Container>
                    <Row>
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