import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { intialState } from "./context/initialState";
import reducer from "./context/reducer";

ReactDOM.render(
    <Router>
        <StateProvider initialState={intialState} reducer={reducer}>
        <App></App>
        </StateProvider>
    </Router>
    , document.getElementById("root")
);