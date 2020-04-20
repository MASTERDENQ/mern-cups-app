import React, { Component } from "react";
import "../css/HomeStyle.css";
import axios from "axios";
import CustomerRegisterModal from "./auth/CustomerRegisterModal";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signal: "",
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    // TODO update parent component
    this.props.history.push("/list");
  }

  componentDidMount() {
    //Request Items
    axios
      .get("/")
      .then((res) => {
        console.log("Conn to Database");
        console.log(res);
        this.setState({ signal: "Conn to Database" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ signal: "Not Connected" });
      });
  }

  render() {
    return (
      <div className="Home">
        <h1>{this.state.signal}</h1>
        <h1 style={{ textAlign: "center" }}>HOME PAGE</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <CustomerRegisterModal
          handleSuccessfulAuth={this.handleSuccessfulAuth}
        />
      </div>
    );
  }
}
export default Home;
