import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {LinkContainer} from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NavigationBar() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">
                    Coffee4j
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/brew">
                            <Nav.Link>
                                Brew
                            </Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Manage">
                            <LinkContainer to="/coffee">
                                <NavDropdown.Item>
                                    Coffee
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/water">
                                <NavDropdown.Item>
                                    Water
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/brewer">
                                <NavDropdown.Item>
                                    Brewer
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/filter">
                                <NavDropdown.Item>
                                    Filter
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/vessel">
                                <NavDropdown.Item>
                                    Vessel
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;