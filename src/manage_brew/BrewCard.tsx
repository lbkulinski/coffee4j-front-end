import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Brew from "./Brew";
import BrewTable from "./BrewTable";
import CreateBrewModal from "./CreateBrewModal";

function BrewCard() {
    const [offsetIds, setOffsetIds] = useState<number[]>([]);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [brews, setBrews] = useState<Brew[]>([]);

    const [createShow, setCreateShow] = useState(false);

    const handleClick = () => {
        setCreateShow(true);
    };

    /*
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
                    <Button className="float-end" variant="outline-primary" onClick={handleClick}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <BrewTable offsetIds={offsetIds} setOffsetIds={setOffsetIds} nextDisabled={nextDisabled}
                               setNextDisabled={setNextDisabled} brews={brews} setBrews={setBrews} />
                </Card.Body>
            </Card>
            <CreateBrewModal show={createShow} setShow={setCreateShow} setOffsetIds={setOffsetIds}
                             setNextDisabled={setNextDisabled} setBrews={setBrews} />
        </>
    );
} //BrewCard

export default BrewCard;