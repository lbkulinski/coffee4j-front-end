import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Card from "react-bootstrap/Card";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ManageRecordCard from "./manage_record/ManageRecordCard";
import RecordType from "./manage_record/RecordType";
import BrewCard from "./manage_brew/BrewCard";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const formData = new FormData();

formData.append("username", "lbk");

formData.append("password", "password");

const config = {
    "withCredentials": false
};

const axios = require("axios").default;

axios.post("/perform_login", formData, config);

const HomeRoute = () => {
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

const BrewRoute = () => {
    return (
        <App element={
            <BrewCard />
        } />
    );
};

const CoffeeRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.COFFEE} requestUrl="/api/coffee" />
        } />
    );
};

const WaterRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.WATER} requestUrl="/api/water" />
        } />
    );
};

const BrewerRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.BREWER} requestUrl="/api/brewer" />
        } />
    );
};

const FilterRoute = () => {
    return (
        <App element={
            <ManageRecordCard recordType={RecordType.FILTER} requestUrl="/api/filter" />
        } />
    );
};

const VesselRoute = () => {
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
            <Route path="/brew" element={<BrewRoute />} />
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