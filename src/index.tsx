import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Card from "react-bootstrap/Card";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ManageRecordCard from "./ManageRecordCard";
import RecordType from "./RecordType";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let formData = new FormData();

formData.append("username", "lbk");

formData.append("password", "password");

let config = {
    "withCredentials": false
};

const axios = require("axios").default;

axios.post("/perform_login", formData, config);

let HomeRoute = () => {
    return (
        <App element={
            <Card>
                <Card.Body>
                    Welcome home!
                </Card.Body>
            </Card>
        } />
    );
};

let CoffeeRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.COFFEE} requestUrl="/api/coffee" />
        } />
    );
};

let WaterRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.WATER} requestUrl="/api/water" />
        } />
    );
};

let BrewerRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.BREWER} requestUrl="/api/brewer" />
        } />
    );
};

let FilterRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.FILTER} requestUrl="/api/filter" />
        } />
    );
};

let VesselRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.VESSEL} requestUrl="/api/vessel" />
        } />
    );
};

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/coffee" element={<CoffeeRoute />} />
            <Route path="/water" element={<WaterRoute />} />
            <Route path="/brewer" element={<BrewerRoute />} />
            <Route path="/filter" element={<FilterRoute />} />
            <Route path="/vessel" element={<VesselRoute />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();