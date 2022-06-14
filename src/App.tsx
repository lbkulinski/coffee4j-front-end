import Container from "react-bootstrap/Card";
import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
      <Container>
          <NavigationBar></NavigationBar>
          <Card>
              <Card.Body>
                  <Card.Title>
                      Test
                  </Card.Title>
              </Card.Body>
          </Card>
      </Container>
  );
}

export default App;