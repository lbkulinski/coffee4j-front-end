import React from 'react';
import Container from "react-bootstrap/Container";
import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

type Props = {
    name: string
}

function App(props: Props) {
    fetch("/perform_login", {
        "method": "POST",
        "mode": "no-cors",
        "credentials": "include",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": "username=lbk&password=password"
    }).then((response: Response) => response.text());

    return (
        <Container>
            <NavigationBar></NavigationBar>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {props.name}
                    </Card.Title>
                    <RecordTable requestUrl="/api/coffee" />
                </Card.Body>
            </Card>
        </Container>
    );
}

export default App;