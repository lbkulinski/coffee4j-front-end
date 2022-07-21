import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {Pagination} from "react-bootstrap";
import Brew from "./Brew";
import loadBrews from "./loadBrews";
import BrewRow from "./BrewRow";

type Props = {
    offsetIds: number[],
    setOffsetIds: (offsetIds: number[]) => void,
    nextDisabled: boolean,
    setNextDisabled: (nextDisabled: boolean) => void,
    brews: Brew[],
    setBrews: (brews: Brew[]) => void,
}

function BrewTable(props: Props) {
    const [previousDisabled, setPreviousDisabled] = useState(true);

    useEffect(() => {
        loadBrews(props.offsetIds, props.setOffsetIds, props.setNextDisabled, props.setBrews);
    }, []);

    const loadPreviousBrews = () => {
        if (props.offsetIds.length === 0) {
            return;
        } //end if

        const offsetIdsCopy = [...props.offsetIds];

        offsetIdsCopy.pop();

        if (offsetIdsCopy.length >= 1) {
            offsetIdsCopy.pop();
        } //end if

        if (offsetIdsCopy.length === 0) {
            setPreviousDisabled(true);
        } //end if

        props.setOffsetIds(offsetIdsCopy);

        loadBrews(offsetIdsCopy, props.setOffsetIds, props.setNextDisabled, props.setBrews);
    };

    const loadNextBrews = () => {
        if (props.offsetIds.length >= 1) {
            setPreviousDisabled(false);
        } //end if

        loadBrews(props.offsetIds, props.setOffsetIds, props.setNextDisabled, props.setBrews);
    };

    return (
        <>
            <Table striped hover>
                <thead>
                <tr>
                    <th>
                        Timestamp
                    </th>
                    <th>
                        Coffee
                    </th>
                    <th>
                        Water
                    </th>
                    <th>
                        Brewer
                    </th>
                    <th>
                        Filter
                    </th>
                    <th>
                        Vessel
                    </th>
                    <th>
                        Coffee Mass
                    </th>
                    <th>
                        Water Mass
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    props.brews.map((brew: Brew) => (
                        <BrewRow key={brew.id} brew={brew} />
                    ))
                }
                </tbody>
            </Table>
            <Pagination className="justify-content-end">
                <Pagination.Prev disabled={previousDisabled} onClick={loadPreviousBrews}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Pagination.Prev>
                <Pagination.Next disabled={props.nextDisabled} onClick={loadNextBrews}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </Pagination.Next>
            </Pagination>
        </>
    );
} //BrewTable

export default BrewTable;