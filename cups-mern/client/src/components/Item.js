import React, { Component } from "react";
import axios from "axios";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: "",
      cost: ""
    };
  }

  // Request Detail for One Item
  componentDidMount() {
    console.log();
    //Request Items
    axios
      .get("https://jsonplaceholder.typicode.com/users", this.props.id)
      .then(res => {
        console.log(res);
        this.setState({ items: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>ITEM PAGE</h1>
        <h2>{this.props.id}</h2>
      </div>
    );
  }
}

export default Item;
