import React, { Component } from "react";
import { NavLink } from "reactstrap";

class Logout extends Component {
  handle = () => {
    localStorage.setItem("isAuthenticated", false);
  };

  render() {
    return (
      <NavLink href="/test" onClick={this.handle}>
        Logout
      </NavLink>
    );
  }
}

export default Logout;
