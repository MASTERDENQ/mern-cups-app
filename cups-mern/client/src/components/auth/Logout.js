import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";

class Logout extends Component {
  // static propTypes = {
  //   logout: this.propTypes.func.isRequired
  // };
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

export default connect(null, { logout })(Logout);
