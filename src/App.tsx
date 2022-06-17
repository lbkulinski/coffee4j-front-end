import React from 'react';
import Container from "react-bootstrap/Container";
import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import RecordTable from "./RecordTable"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

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
                  <ReactPaginate
                      nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                      onPageChange={(page) => console.log(page)}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={4000}
                      previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination justify-content-end"
                      activeClassName="active"
                  />
              </Card.Body>
          </Card>
      </Container>
  );
}

export default App;