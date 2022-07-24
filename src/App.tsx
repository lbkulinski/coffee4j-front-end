import React, {ReactElement} from "react";
import Container from "react-bootstrap/Container";
import NavigationBar from "./NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface Props {
    element: ReactElement
};

function App(props: Props) {
    return (
        <Container>
            <NavigationBar></NavigationBar>
            {
                props.element
            }
        </Container>
    );
}

export default App;