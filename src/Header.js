import React, { Component } from "react";
import {
    Route,
    NavLink,
} from "react-router-dom";
import Employee from "./Employee";
import RequestForSupply from "./RequestForSupply";

class Header extends Component {
    render() {
        return (
            <div>
                <ul className="header">
                    <li><NavLink to="/employee">Radnici</NavLink></li>
                    <li><NavLink to="/requestforsupply">Zahtev za nabavku</NavLink></li>
                </ul>
                <div className="content">
                    <Route path="/employee" component={Employee} />
                    <Route path="/requestforsupply" component={RequestForSupply} />
                </div>
            </div>);
    }
};
export default Header;