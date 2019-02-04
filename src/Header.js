import React, { Component } from "react";
import {
    Route,
    NavLink,
} from "react-router-dom";
import Home from "./Home";
import Employee from "./Employee";
import RequestForSupply from "./RequestForSupply";

class Header extends Component {
    render() {
        return (
            <header class="header--large" id = "menu">
            <div class="navbar shadow">
                <ul className="header" >
                    <li class="menu__item"><NavLink exact to="/">Početna</NavLink></li>
                    <li class="menu-item"><NavLink to="/employee">Radnici</NavLink></li>
                    <li class="menu-item"><NavLink to="/requestforsupply">Zahtev za nabavku</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home} />
                    <Route path="/employee" component={Employee} />
                    <Route path="/requestforsupply" component={RequestForSupply} />
                </div>
                </div>
            </header>);
    }
};
export default Header;