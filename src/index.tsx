import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ManageRecordCard from "./ManageRecordCard";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch("/perform_login", {
    "method": "POST",
    "mode": "no-cors",
    "credentials": "include",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "body": "username=lbk&password=password"
}).then((response: Response) => response.text());

let CoffeeRoute = () => {
    return (
        <App element={
            <ManageRecordCard name="Coffee" requestUrl="/api/coffee" />
        } />
    );
};

let WaterRoute = () => {
    return (
        <App element={
            <ManageRecordCard name="Water" requestUrl="/api/water" />
        } />
    );
};

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/coffee" element={<CoffeeRoute />} />
            <Route path="/water" element={<WaterRoute />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();