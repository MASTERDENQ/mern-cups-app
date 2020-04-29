import React, { Component } from "react";
import { NavLink } from "reactstrap";

class Logout extends Component {
  render() {
    return (
      <div>
        <NavLink href="/">Logout</NavLink>
      </div>
    );
  }
}

export default Logout;
