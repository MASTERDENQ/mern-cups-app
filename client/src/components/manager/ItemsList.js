import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Alert } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../css/ItemsListStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ViewFile from "./itemModels/ViewFile";
import UpdateModal from "./itemModels/UpdateModal";
// import DeleteModal from "../../reusableComponents/deleteModal";

class ItemsList extends Component {
  /**************** COMPONENT STATES ******************** */

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      id: "",
      isLoaded: false,
      msg: null,
    };
  }

  onClick = (e) => {
    if (!this.state.id) {
      e.preventDefault();
    }
  };

  /*********  Retrieve id for Single Request ***************/

  showItem = (_id) => {
    this.setState({ id: _id });
    this.requestDetail(_id);
  };

  getId = (_id) => {
    this.setState({ id: _id });
  };

  /*****************  Delete Request for One Item ***************/

  deleteItem = (_id) => {
    console.log(`Delete Request for Item ${_id}`);
    axios
      .post(`/delete_menu_item/${_id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ msg: err.response.data });
      });
  };

  /************** Request To Retrieve All Items ***************** */

  componentDidMount() {
    console.log();
    //Request Items
    axios
      .get("/list_items")
      .then((res) => {
        console.log(res);
        this.setState({ items: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {/*********** Display all items here ********* */}

        <Container>
          <h1>Status: {this.props.loggedInStatus}</h1>

          <Link to="/add">
            <Button className="mt-4 mb-3" color="dark">
              ADD ITEM
            </Button>
          </Link>

          {/* Error display */}
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}

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
                    {/* DELETE BUTTON */}
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.deleteItem.bind(this, items._id)}
                    >
                      &times;
                    </Button>
                    {/* <Link to="update" onClick={this.onClick}></Link> */}
                    <Button
                      className="remove-btn"
                      color="primary"
                      size="sm"
                      onClick={this.getId.bind(this, items._id)}
                    >
                      <UpdateModal id={this.state.id} />
                    </Button>

                    {/* VIEW MENU ITEM FILES */}
                    <Button
                      className="remove-btn"
                      color="success"
                      size="sm"
                      onClick={this.getId.bind(this, items._id)}
                    >
                      <ViewFile id={this.state.id} />
                    </Button>
                    <b>
                      <i>
                        <u>
                          NAME: {items.item_name} ** &emsp; CATEGORY:{" "}
                          {items.category} ** &emsp; STOCK: {items.stock} **
                          &emsp; COST: ${items.cost} **
                        </u>
                      </i>
                    </b>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

export default ItemsList;
