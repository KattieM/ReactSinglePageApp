import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";
import {
  HashRouter
} from "react-router-dom";
 
ReactDOM.render(
  <HashRouter>
  <Main/>
  </HashRouter>,
  document.getElementById("root")
);