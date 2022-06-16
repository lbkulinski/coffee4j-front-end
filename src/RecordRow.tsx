import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-regular-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    name: string
}

function RecordRow(props: Props) {
    return (
        <tr>
            <td>
                {props.name}
            </td>
            <td>
                <Container>
                    <Row className="row-cols-auto">
                        <Col>
                            <a id="anchor_edit">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </a>
                        </Col>
                        <Col>
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