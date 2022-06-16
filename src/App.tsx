import React from 'react';
import Container from "react-bootstrap/Container";
import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
      <Container>
          <NavigationBar></NavigationBar>
          <Card>
              <Card.Body>
                  <Card.Title>
                      Breeds
                  </Card.Title>
                  <RecordTable requestUrl="https://api.thecatapi.com/v1/breeds" />
              </Card.Body>
          </Card>
      </Container>
  );
}

export default App;