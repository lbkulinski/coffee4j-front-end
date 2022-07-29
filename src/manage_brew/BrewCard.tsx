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
import ReadBrewModal from "./ReadBrewModal";
import UpdateBrewModal from "./UpdateBrewModal";

function BrewCard() {
    const [offsetIds, setOffsetIds] = useState<number[]>([]);

    const [nextDisabled, setNextDisabled] = useState(false);

    const [brews, setBrews] = useState<Brew[]>([]);

    const [createShow, setCreateShow] = useState(false);

    const handleCreateClick = () => {
        setCreateShow(true);
    };

    const [readShow, setReadShow] = useState(false);

    const [updateShow, setUpdateShow] = useState(false);

    const [brew, setBrew] = useState<Brew | null>(null);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Brew
                    </Card.Title>
                    <div className="d-flex justify-content-end">
                        <Button variant="outline-primary" onClick={handleCreateClick}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                    <BrewTable offsetIds={offsetIds} setOffsetIds={setOffsetIds} nextDisabled={nextDisabled}
                               setNextDisabled={setNextDisabled} brews={brews} setBrews={setBrews} setBrew={setBrew}
                               setReadShow={setReadShow} setUpdateShow={setUpdateShow} />
                </Card.Body>
            </Card>
            <CreateBrewModal show={createShow} setShow={setCreateShow} setOffsetIds={setOffsetIds}
                             setNextDisabled={setNextDisabled} setBrews={setBrews} />
            {
                (brew !== null) && <ReadBrewModal brew={brew} show={readShow} setShow={setReadShow} />
            }
            {
                (brew !== null) && <UpdateBrewModal brew={brew} show={updateShow} setShow={setUpdateShow}
                                                    setOffsetIds={setOffsetIds} setNextDisabled={setNextDisabled}
                                                    setBrews={setBrews} />
            }
        </>
    );
} //BrewCard

export default BrewCard;