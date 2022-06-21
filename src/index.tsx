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

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
                <App element={
                    <ManageRecordCard name="Coffee" requestUrl="/api/coffee" />
                } />
            } />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();