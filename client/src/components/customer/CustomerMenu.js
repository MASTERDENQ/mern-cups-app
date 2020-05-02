import React, { Component } from "react";
// import '../css/CustomerMenuStyle.css'
import ReviewOrder from "./ReviewOrder";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";
import SearchMenu from "./SearchMenu";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ViewFile from "../manager/itemModels/ViewFile";
import { Link } from "react-router-dom";

class CustomerMenu extends Component {
  // **************** COMPONENT STATES *************************/
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      orderedItems: [],
      sumTotal: "",
      review: false,
      msg: "Please charge values to add to chart. Ensure numbers are valid",
      error: "",
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

  // *************** CHANGE VIEW TO REVIEW COMPONENT *************/
  changeView(status) {
    if (status === "clear") {
      this.setState({
        orderedItems: [],
        sumTotal: "",
        review: !this.state.review,
      });

      console.log("Change If", this.state.orderedItems);
    } else if (status === "open") {
      this.setState({
        review: !this.state.review,
      });

      console.log("CHANGE VIEW: ", this.state.review);
      console.log("Change If", this.state.orderedItems);
    }
  }

  calculateSumTotal = () => {
    // Variable to calculate total cost of order
    var sum = 0;
    var itemCost = 0;
    var itemQty = 0;

    // Calculate total cost of all items ordered
    for (let i = 0; i < this.state.orderedItems.length; i++) {
      itemCost = this.state.orderedItems[i].cost;
      itemQty = this.state.orderedItems[i].quantity;
      sum += itemCost * itemQty;
    }

    this.setState({ sumTotal: sum });
    console.log("ORDER SUM: ", this.state.sumTotal);

    if (sum > this.props.account_balance) {
      this.setState({
        error:
          "WARNING: Please re-evaluate your orders. Current cost of order exceeds balance. Thank you.",
      });
    } else {
      this.changeView("open");
    }
  };

  // *************** ORDER HANDLER *********************/
  changeHandler = (id, name, cost, value, stock) => {
    // Returns the item object if item exists and undefined otherwise.
    let res = this.state.orderedItems.find((item) => item.id === id);
    // console.log("Results: ", res);
    var quantity = parseInt(value, 10);

    if (quantity > stock) {
      this.setState({
        error:
          "WARNING: Please re-evaluate your orders. Quantity exceeds amount in stock. If you contine you will only got what is in stock Thank you.",
      });
    }
    // If order does not exist
    // if quatity is not 0
    // If quantity is a number
    // then make a new object to add to order array
    else if (res === undefined && quantity !== 0 && !isNaN(quantity)) {
      let obj = {
        id,
        name,
        cost,
        quantity,
        total: cost * quantity,
      };
      console.log("NEW OBJECT: ", obj);

      // append new object to order array
      this.setState({
        orderedItems: [...this.state.orderedItems, obj],
      });

      console.log("NEW QTY", quantity);
    }
    // If quantity is 0 or Not-a-Number (NaN) then remove object and update
    else if (quantity === 0 || isNaN(quantity)) {
      // Exception Handler to deal with initial entry being zero then cancelled
      if (res === undefined) {
        return 0;
      }

      // Remove item object from array
      let obj = this.state.orderedItems.splice(
        this.state.orderedItems.findIndex((item) => item.id === id),
        1
      );
      console.log("OBJECT TO REMOVED: ", obj);

      let index = this.state.orderedItems.indexOf(id); // find index of quantity to remove
      const list = Object.assign([], this.state.orderedItems); // copy state to update
      list.splice(index, 1); // remove invalid item object from order array
      this.setState({ orderedItems: list }); // update state with valid orders
      console.log("UPDATED ORDERS: ", list);
      console.log("NEW QTY", quantity);
    }
    // Else update order list with valid values
    else {
      // Remove item object and update all values
      let obj = this.state.orderedItems.splice(
        this.state.orderedItems.findIndex((item) => item.id === id),
        1
      );
      console.log("OBJECT TO UPDATE", obj);
      console.log("NEW QTY", quantity);
      // assign updated values to object
      obj[0].quantity = quantity;
      obj[0].total = cost * quantity;

      // Copy state array
      let temp = this.state.orderedItems;
      // Update array
      temp.push(...obj);
      // Reassign copy to state
      this.setState({
        orderedItems: temp,
      });
    }
  };

  render() {
    const pass = this.props.loggedInStatus;

    if (pass === "NOT_LOGGED_IN") {
      return (
        <div>
          <h1>
            YOU ARE NOT LOGGED IN. PLEASE <Link to="/">LOGIN</Link>
          </h1>
        </div>
      );
    } else if (!this.state.isLoaded) {
      return (
        <Container>
          <h1>Loading....</h1>
        </Container>
      );
    } else {
      return this.state.review === false ? (
        <Container>
          <div>
            <h1 style={{ marginBottom: "3rem" }}>
              <Alert color="dark">CUSTOMER MENU</Alert>
            </h1>

            <div style={{ marginBottom: "1rem" }}>
              <SearchMenu />
            </div>

            <Alert color="info">{this.state.msg}</Alert>

            {this.state.error ? (
              <Alert color="danger">{this.state.error}</Alert>
            ) : (
              ""
            )}

            <Alert>
              <Row>
                <Col>
                  A/C BALANCE: ${this.props.account_balance}.00---------
                </Col>
                <Col> SUM TOTAL: ${this.state.sumTotal}.00---------</Col>
              </Row>
            </Alert>

            <ListGroup>
              <TransitionGroup className="items-list">
                {this.state.items.map((items) => (
                  <CSSTransition
                    key={items._id}
                    timeout={500}
                    classNames="fade"
                    color="dark"
                  >
                    <ListGroupItem
                      className="container"
                      style={{ marginRight: "4rem" }}
                    >
                      <b>
                        <Row>
                          <Col>
                            <input
                              name="quantity"
                              id={items._id}
                              placeholder="0"
                              type="number"
                              min="1"
                              max="1000"
                              maxLength="3"
                              onChange={() => {
                                this.changeHandler(
                                  items._id,
                                  items.item_name,
                                  items.cost,
                                  // item amount
                                  document.getElementById(items._id).value,
                                  items.stock
                                );
                              }}
                            />
                          </Col>
                          <Col>NAME: {items.item_name}</Col>
                          <Col>CATEGORY: {items.category}</Col>
                          <Col>STOCK: {items.stock} </Col>
                          <Col>UNIT COST: ${items.cost} </Col>
                          {/* VIEW MENU ITEM FILES */}
                          <Col>
                            <Button
                              className="remove-btn"
                              color="primary"
                              size="sm"
                            >
                              <ViewFile id={items._id} />
                            </Button>
                          </Col>
                        </Row>
                      </b>
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
            {this.state.orderedItems.length === 0 ? (
              <Alert
                style={{ marginTop: "3rem", marginBottom: "3rem" }}
                color="success"
              >
                <h3>
                  Please enter the amount needed, then you will be able to
                  confirm your order.
                </h3>
              </Alert>
            ) : (
              <Button
                onClick={() => {
                  this.calculateSumTotal();
                }}
                style={{ marginTop: "3rem", marginBottom: "3rem" }}
                color="success"
                block
              >
                REVIEW ORDER
              </Button>
            )}
          </div>
        </Container>
      ) : (
        <ReviewOrder
          orderedItems={this.state.orderedItems}
          sumTotal={this.state.sumTotal}
          username={this.props.username}
          acc_bal={this.props.account_balance}
          changeView={() => this.changeView("clear")}
        />
      );
    }
  }
}

export default CustomerMenu;
