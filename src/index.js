import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";
import {
  HashRouter
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
 
ReactDOM.render(
  <HashRouter>
  <Main/>
  </HashRouter>,
  document.getElementById("root")
);