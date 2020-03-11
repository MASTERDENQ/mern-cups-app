import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";

class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default Logout;
