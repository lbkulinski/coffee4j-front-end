import React, {ReactNode, useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {Pagination} from "react-bootstrap";
import Brew from "./Brew";
import loadBrews from "./loadBrews";
import BrewRow from "./BrewRow";

interface Props {
    offsetIds: number[],
    setOffsetIds: (offsetIds: number[]) => void,
    nextDisabled: boolean,
    setNextDisabled: (nextDisabled: boolean) => void,
    brews: Brew[],
    setBrews: (brews: Brew[]) => void,
    setBrew: (brew: Brew) => void,
    setReadShow: (show: boolean) => void,
    setUpdateShow: (show: boolean) => void
}

interface State {
    previousDisabled: boolean,
}

class BrewTable extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            "previousDisabled": true
        };

        this.loadPreviousBrews = this.loadPreviousBrews.bind(this);

        this.loadNextBrews = this.loadNextBrews.bind(this);
    } //constructor

    private loadPreviousBrews(): void {
        if (this.props.offsetIds.length === 0) {
            return;
        } //end if

        const offsetIdsCopy = [...this.props.offsetIds];

        offsetIdsCopy.pop();

        if (offsetIdsCopy.length >= 1) {
            offsetIdsCopy.pop();
        } //end if

        if (offsetIdsCopy.length === 0) {
            this.setState({
                "previousDisabled": true
            });
        } //end if

        this.props.setOffsetIds(offsetIdsCopy);

        loadBrews(offsetIdsCopy, this.props.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);
    } //loadPreviousBrews

    private loadNextBrews(): void {
        if (this.props.offsetIds.length >= 1) {
            this.setState({
                "previousDisabled": false
            });
        } //end if

        loadBrews(this.props.offsetIds, this.props.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);
    } //loadNextBrews

    public componentDidMount() {
        loadBrews(this.props.offsetIds, this.props.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);
    } //componentDidMount

    public render(): ReactNode{
        return (
            <>
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>
                            Timestamp
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.brews.map((brew: Brew) => <BrewRow key={brew.id} brew={brew}
                                                                      setBrew={this.props.setBrew}
                                                                      setReadShow={this.props.setReadShow}
                                                                      setUpdateShow={this.props.setUpdateShow} />
                        )
                    }
                    </tbody>
                </Table>
                <Pagination className="justify-content-end">
                    <Pagination.Prev disabled={this.state.previousDisabled} onClick={this.loadPreviousBrews}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Pagination.Prev>
                    <Pagination.Next disabled={this.props.nextDisabled} onClick={this.loadNextBrews}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Pagination.Next>
                </Pagination>
            </>
        );
    } //render
}

export default BrewTable;