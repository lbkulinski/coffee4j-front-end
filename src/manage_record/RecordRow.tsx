import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan, faBoxArchive} from "@fortawesome/free-solid-svg-icons"
import "bootstrap/dist/css/bootstrap.min.css";
import Record from "./Record";

type Props = {
    record: Record,
    setRecord: (record: Record) => void,
    setUpdateShow: (updateShow: boolean) => void,
    setDeleteShow: (deleteShow: boolean) => void
}

function RecordRow(props: Props) {
    const tdWidth = {
        width: "80%"
    };

    const showUpdateModal = () => {
        props.setRecord(props.record);

        props.setUpdateShow(true);
    };

    const showDeleteModal = () => {
        props.setRecord(props.record);

        props.setDeleteShow(true);
    };

    return (
        <tr>
            <td style={tdWidth}>
                {
                    props.record.name
                }
            </td>
            <td>
                <Container>
                    <Row>
                        <Col xs="1">
                            <a onClick={showUpdateModal}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </a>
                        </Col>
                        <Col xs="1">
                            <a>
                                <FontAwesomeIcon icon={faBoxArchive} />
                            </a>
                        </Col>
                        <Col xs="1">
                            <a onClick={showDeleteModal}>
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