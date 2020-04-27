import React, { Component } from "react";
// import '../css/CustomerMenuStyle.css'
import {} from "react-router-dom";
import ReviewOrder from "./ReviewOrder";
import { Container, Card, Label, Button, Alert } from "reactstrap";
import SearchMenu from "./SearchMenu";

class CustomerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      orderedItems: [],
      review: false,
      msg: "Please charge values to add to chart",
    };
  }

  /************** Request To Retrieve All Items ***************** */
  componentDidMount() {
    fetch("/list_items")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
        console.log(this.state.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeView() {
    if (this.state.orderedItems) {
      this.setState({
        review: !this.state.review,
      });
      console.log("CHANGE VIEW: ", this.state.review);
    }
  }

  changeHandler = (id, name, value) => {
    let res = this.state.orderedItems.find((item) => item.id === id);

    if (res === undefined) {
      let obj = {
        id,
        name,
        value,
      };
      console.log("IF: ", obj);

      this.setState({
        orderedItems: [...this.state.orderedItems, obj],
      });
    } else {
      let obj = this.state.orderedItems.splice(
        this.state.orderedItems.findIndex((item) => item.id === id),
        1
      );
      console.log("ELSE: ", obj);

      obj[0].value = value;

      let temp = this.state.orderedItems;
      temp.push(...obj);

      this.setState({
        orderedItems: temp,
      });
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h1>Loading Menu</h1>
        </div>
      );
    } else {
      return this.state.review === false ? (
        <Container>
          <div id="MainBody">
            <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
              CUSTOMER MENU
            </h1>
            <div style={{ marginBottom: "3rem" }} color="primary">
              <SearchMenu />
            </div>

            <Alert color="danger">{this.state.msg}</Alert>

            {this.state.items.map((items) => (
              <div key={items._id} className="MenuItem">
                <input
                  name="quantity"
                  id={items._id}
                  placeholder="0"
                  type="number"
                  min="0"
                  onChange={() => {
                    this.changeHandler(
                      items._id,
                      items.item_name,
                      document.getElementById(items._id).value
                    );
                  }}
                />
                <b>
                  <i>
                    <u>
                      NAME: {items.item_name} ** &emsp; CATEGORY:{" "}
                      {items.category} ** &emsp; STOCK: {items.stock} ** &emsp;
                      COST: ${items.cost} **
                    </u>
                  </i>
                </b>
              </div>
            ))}

            <Button
              onClick={() => {
                this.changeView();
              }}
              style={{ marginTop: "3rem", marginBottom: "3rem" }}
              color="success"
              block
            >
              REVIEW ORDER
            </Button>
          </div>
        </Container>
      ) : (
        <ReviewOrder
          orderedItems={this.state.orderedItems}
          changeView={() => this.changeView()}
        />
      );
    }
  }
}

export default CustomerMenu;
