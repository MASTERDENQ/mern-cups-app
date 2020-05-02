import React, { Component } from "react";
import "../css/HomeStyle.css";
import axios from "axios";
import CustomerRegisterModal from "./auth/CustomerRegisterModal";
import ManagerRegisterModal from "./auth/ManagerRegisterModal";
import ManagerLoginModal from "./auth/ManagerLoginModal";
import CustomerLoginModal from "./auth/CustomerLoginModal";
import { Container, Alert } from "reactstrap";
// import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signal: "",
    };

    this.handleSuccessfulCustomerAuth = this.handleSuccessfulCustomerAuth.bind(
      this
    );
    this.handleSuccessfulManagerAuth = this.handleSuccessfulManagerAuth.bind(
      this
    );
  }

  handleSuccessfulCustomerAuth(data, username) {
    this.props.handleLogin(data, username);
    // TODO update parent component
    this.props.history.push("/menu");
  }

  handleSuccessfulManagerAuth(data, username) {
    this.props.handleLogin(data, username);
    // TODO update parent component
    this.props.history.push("/control");
  }

  componentDidMount() {
    //Request Items
    axios
      .get("/connect")
      .then((res) => {
        console.log("Conn to Database");
        console.log(res);
        this.setState({ signal: "Connected..." });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ signal: "Not Connected..." });
      });
  }

  render() {
    return (
      <Container className="mt-20">
        <Alert color="dark">
          <h1>Welcome to C.U.P.S Store</h1>
        </Alert>

        <Alert color="info">
          <p>{this.state.signal}</p>

          <h6>
            Welcome one and all, make yourselves at home from home with this
            amazing application by "THE PROGRAMMING KINGS"
          </h6>
          <hr />
          <h6>
            This is a very user friendly application with easy to follow
            instruction and more...
          </h6>

          <hr />
          <h6>
            Note: the use of the browser reload will log you out. So use
            application buttons to maneuver.{" "}
          </h6>

          <hr />

          <h5>
            You can login or signup by the click of the buttons below to
            continue and enjoy...
          </h5>
        </Alert>

        <CustomerRegisterModal
          handleSuccessfulAuth={this.handleSuccessfulCustomerAuth}
        />

        <CustomerLoginModal
          handleSuccessfulAuth={this.handleSuccessfulCustomerAuth}
        />

        <ManagerRegisterModal
          handleSuccessfulAuth={this.handleSuccessfulManagerAuth}
        />

        <ManagerLoginModal
          handleSuccessfulAuth={this.handleSuccessfulManagerAuth}
        />
      </Container>
    );
  }
}
export default Home;
