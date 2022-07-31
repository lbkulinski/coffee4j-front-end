import React, {ReactNode, useState} from 'react';
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import Brew from "./Brew";
import BrewTable from "./BrewTable";
import CreateBrewModal from "./CreateBrewModal";
import ReadBrewModal from "./ReadBrewModal";
import UpdateBrewModal from "./UpdateBrewModal";
import {Pagination} from "react-bootstrap";
import loadBrews from "./loadBrews";

interface Props {
}

interface State {
    brews: Brew[],
    brew: Brew | null,
    createShow: boolean,
    readShow: boolean,
    updateShow: boolean,
    previousDisabled: boolean,
    nextDisabled: boolean,
    offsetIds: number[]
}

/*
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
     */

/*
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
                    <BrewTable brews={brews} setBrew={setBrew} setReadShow={setReadShow}
                               setUpdateShow={setUpdateShow} />
                    <Pagination className="justify-content-end">
                        <Pagination.Prev disabled={this.state.previousDisabled} onClick={this.loadPreviousBrews}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </Pagination.Prev>
                        <Pagination.Next disabled={this.props.nextDisabled} onClick={this.loadNextBrews}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Pagination.Next>
                    </Pagination>
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
 */

class BrewCard extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            brews: [],
            brew: null,
            createShow: false,
            readShow: false,
            updateShow: false,
            previousDisabled: true,
            nextDisabled: false,
            offsetIds: []
        };

        this.handleCreateClick = this.handleCreateClick.bind(this);

        this.setBrew = this.setBrew.bind(this);

        this.setReadShow = this.setReadShow.bind(this);
    } //constructor

    private handleCreateClick(): void {
        this.setState({
            createShow: true
        });
    } //handleCreateClick

    private setBrew(brew: Brew | null) {
        this.setState({
            brew: brew
        });
    } //setBrew

    private setReadShow(readShow: boolean) {
        this.setState({
            readShow: readShow
        });
    } //setReadShow

    private setUpdateShow(updateShow: boolean) {
        this.setState({
            updateShow: updateShow
        });
    } //setUpdateShow

    private loadPreviousBrews(): void {
        if (this.state.offsetIds.length === 0) {
            return;
        } //end if

        const offsetIdsCopy = [...this.state.offsetIds];

        offsetIdsCopy.pop();

        if (offsetIdsCopy.length >= 1) {
            offsetIdsCopy.pop();
        } //end if

        if (offsetIdsCopy.length === 0) {
            this.setState({
                "previousDisabled": true
            });
        } //end if

        this.setState({
            offsetIds: offsetIdsCopy
        });

        //loadBrews(offsetIdsCopy, this.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);
    } //loadPreviousBrews

    private loadNextBrews(): void {
        if (this.state.offsetIds.length >= 1) {
            this.setState({
                "previousDisabled": false
            });
        } //end if

        //loadBrews(this.props.offsetIds, this.props.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);
    } //loadNextBrews

    public componentDidMount() {
        //loadBrews(this.props.offsetIds, this.props.setOffsetIds, this.props.setNextDisabled, this.props.setBrews);
    } //componentDidMount

    public render(): ReactNode {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Brew
                        </Card.Title>
                        <div className="d-flex justify-content-end">
                            <Button variant="outline-primary" onClick={this.handleCreateClick}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </div>
                        <BrewTable brews={this.state.brews} setBrew={this.setBrew} setReadShow={this.setReadShow}
                                   setUpdateShow={this.setUpdateShow} />
                        <Pagination className="justify-content-end">
                            <Pagination.Prev disabled={this.state.previousDisabled} onClick={this.loadPreviousBrews}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </Pagination.Prev>
                            <Pagination.Next disabled={this.state.nextDisabled} onClick={this.loadNextBrews}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </Pagination.Next>
                        </Pagination>
                    </Card.Body>
                </Card>
                {/*
                <CreateBrewModal show={createShow} setShow={setCreateShow} setOffsetIds={setOffsetIds}
                                 setNextDisabled={setNextDisabled} setBrews={setBrews} />
                */}
                {/*
                    (brew !== null) && <ReadBrewModal brew={brew} show={readShow} setShow={setReadShow} />
                */}
                {/*
                    (brew !== null) && <UpdateBrewModal brew={brew} show={updateShow} setShow={setUpdateShow}
                                                        setOffsetIds={setOffsetIds} setNextDisabled={setNextDisabled}
                                                        setBrews={setBrews} />
                */}
            </>
        );
    } //render
}

export default BrewCard;