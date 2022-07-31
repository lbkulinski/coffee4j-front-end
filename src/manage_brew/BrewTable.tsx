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
    brews: Brew[],
    setBrew: (brew: Brew) => void,
    setReadShow: (show: boolean) => void,
    setUpdateShow: (show: boolean) => void
}

interface State {
}

class BrewTable extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
        };
    } //constructor

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
            </>
        );
    } //render
}

export default BrewTable;