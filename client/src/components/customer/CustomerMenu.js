import React, { Component } from "react";
// import '../css/CustomerMenuStyle.css'
import {} from "react-router-dom";
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

  // *************** CHANGE VIEW TO REVIEW COMPONENT *************/
  changeView() {
    if (this.state.orderedItems) {
      this.setState({
        review: !this.state.review,
      });
      console.log("CHANGE VIEW: ", this.state.review);
    }
  }

  // *************** ORDER HANDLER *********************/
  changeHandler = (id, name, cost, value) => {
    var sum = 0;
    var itemCost = 0;
    var itemQty = 0;
    let res = this.state.orderedItems.find((item) => item.id === id);

    var quantity = parseInt(value, 10);

    if (res === undefined) {
      let obj = {
        id,
        name,
        cost,
        quantity,
        total: cost * quantity,
      };
      console.log("IF: ", obj);

      this.setState({
        orderedItems: [...this.state.orderedItems, obj],
      });

      // Calculate total cost of all items ordered

      for (let i = 0; i < this.state.orderedItems.length; i++) {
        itemCost = this.state.orderedItems[i].cost;
        itemQty = this.state.orderedItems[i].quantity;
        sum += itemCost * itemQty;
      }

      this.setState({ sumTotal: sum });
      console.log("ORDER SUM: ", this.state.sumTotal);
    } else {
      let obj = this.state.orderedItems.splice(
        this.state.orderedItems.findIndex((item) => item.id === id),
        1
      );
      console.log("ELSE: ", obj);

      obj[0].quantity = quantity;
      obj[0].total = cost * quantity;

      let temp = this.state.orderedItems;
      temp.push(...obj);

      this.setState({
        orderedItems: temp,
      });

      // Calculate total cost of all items ordered

      for (let i = 0; i < this.state.orderedItems.length; i++) {
        itemCost = this.state.orderedItems[i].cost;
        itemQty = this.state.orderedItems[i].quantity;
        sum += itemCost * itemQty;
      }

      this.setState({ sumTotal: sum });
      console.log("ORDER SUM: ", this.state.sumTotal);
    }
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <Container>
          <h1>Loading....</h1>
        </Container>
      );
    } else {
      return this.state.review === false ? (
        <Container>
          <div id="MainBody">
            <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
              CUSTOMER MENU
            </h1>

            <div style={{ marginBottom: "1rem" }}>
              <SearchMenu />
            </div>

            <Alert color="danger">{this.state.msg}</Alert>

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
                              min="0"
                              onChange={() => {
                                this.changeHandler(
                                  items._id,
                                  items.item_name,
                                  items.cost,
                                  // item amount
                                  document.getElementById(items._id).value
                                );
                              }}
                            />
                          </Col>
                          <Col>NAME: {items.item_name}</Col>
                          <Col>CATEGORY: {items.category}</Col>
                          <Col>STOCK: {items.stock} </Col>
                          <Col>COST: ${items.cost} </Col>
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
          sumTotal={this.state.sumTotal}
          username={this.props.username}
          acc_bal={this.props.account_balance}
        />
      );
    }
  }
}

export default CustomerMenu;
