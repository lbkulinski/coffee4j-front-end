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
    const date = new Date(props.brew.timestamp);

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

    const dateString = format.format(date);

    return (
        <tr>
            <td>
                {
                    dateString
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