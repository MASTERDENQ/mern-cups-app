import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "../css/HomeStyle.css";
import axios from "axios";

class Home extends Component {
  state = {
    signal: "",
  };

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
      </div>
    );
  }
}

/* <Link to="/login">
        <button className="card">
          <h1>
            <b>MANAGER</b>
          </h1>
        </button>
      </Link>
      <br />
      <br />
      <Link to="/create">
        <button className="card">
          <h1>
            <b>CUSTOMER</b>
          </h1>
        </button>
      </Link> */
export default Home;
