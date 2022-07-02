import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-regular-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import Record from "./Record";

type Props = {
    record: Record
}

function RecordRow(props: Props) {
    const style = {
        "width": "80%"
    };

    return (
        <tr>
            <td style={style}>
                {
                    props.record.name
                }
            </td>
            <td>
                <Container>
                    <Row>
                        <Col xs="1">
                            <a id="anchor_edit">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </a>
                        </Col>
                        <Col xs="1">
                            <a id="anchor_delete">
                                <FontAwesomeIcon icon={faTrashCan} />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </td>
        </tr>
    );
} //RecordRow

export default RecordRow;