import React from "react";
import { Link } from "react-router-dom";
import "../css/HomeStyle.css";

function Home() {
  return (
    <div className="Home">
      <Link to="/login">
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
      </Link>
    </div>
  );
}

export default Home;
