import React, { Component, Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

class Main extends Component {
  render() {
    return (
      <Fragment>
          <Header/>
          <Footer/>
      </Fragment>
    );
  }
}
 
export default Main;