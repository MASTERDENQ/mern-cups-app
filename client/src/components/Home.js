import React, { Component } from "react";
import "../css/HomeStyle.css";
import axios from "axios";
import CustomerRegisterModal from "./auth/CustomerRegisterModal";
import ManagerRegisterModal from "./auth/ManagerRegisterModal";
import ManagerLoginModal from "./auth/ManagerLoginModal";
import CustomerLoginModal from "./auth/CustomerLoginModal";
import { Container } from "reactstrap";
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
    this.props.history.push("/list");
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
        <h1>Welcome to C.U.P.S Store</h1>
        <p>{this.state.signal}</p>
        <p>Status: {this.props.loggedInStatus}</p>

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
