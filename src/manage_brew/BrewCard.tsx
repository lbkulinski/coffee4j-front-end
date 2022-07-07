import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Brew from "./Brew";
import BrewTable from "./BrewTable";

function BrewCard() {
    const [offsetIds, setOffsetIds] = useState<number[]>([]);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [brews, setBrews] = useState<Brew[]>([]);

    /*
    const [createShow, setCreateShow] = useState(false);

    const [record, setRecord] = useState({
                                             "id": 0,
                                             "name": ""
                                         });

    const [updateShow, setUpdateShow] = useState(false);

    const [deleteShow, setDeleteShow] = useState(false);

    const showCreateModal = () => {
        setCreateShow(true);
    };
     */

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Brew
                    </Card.Title>
                    <Button className="float-end" variant="outline-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <BrewTable offsetIds={offsetIds} setOffsetIds={setOffsetIds} nextDisabled={nextDisabled}
                               setNextDisabled={setNextDisabled} brews={brews} setBrews={setBrews} />
                </Card.Body>
            </Card>
        </>
    );
} //BrewCard

export default BrewCard;