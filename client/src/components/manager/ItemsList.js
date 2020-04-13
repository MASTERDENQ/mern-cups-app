import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  // NavItem,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Alert,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/ItemsListStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import DeleteModal from "../../reusableComponents/deleteModal";

class ItemsList extends Component {
  /**************** COMPONENT STATES ******************** */

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      id: "",
      item: [],
      isLoaded: false,
      deleteModalVisible: false,
      editModalVisible: false,
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

  /*********  Request Detail For One Item ***************/

  requestDetail = (id) => {
    console.log(`Request Details for Item ${id}`);
    //Request Items
    axios
      .get(`testdb/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({ item: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*****************  Delete Request for One Item ***************/

  deleteItem = (_id) => {
    console.log(`Delete Request for Item ${_id}`);
    axios
      .delete(`/delete_menu_item/${_id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ msg: err.response.data });
      });
  };

  /*********  Request to edit one Item ***************/

  // updateItem = (body, field) => {
  //   console.log(`Edit Request for the ${field} of item ${id}`);
  //   axios
  //     .post(`testdb/edit_item/${field}`, body)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  /************** Request To Retrieve All Items Names ***************** */

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
    // Destructure item
    const { _id, item_name, category, cost } = this.state.item;

    return (
      <div>
        {/*********** Display all items here ********* */}

        <Container>
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
                <CSSTransition key={items._id} timeout={500} classNames="fade">
                  <ListGroupItem
                    className="container"
                    style={{ marginRight: "4rem" }}
                  >
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
                      color="danger"
                      size="sm"
                      onClick={this.getId.bind(this, items._id)}
                    >
                      <UpdateModal id={this.state.id} />
                    </Button>

                    <Button className="remove-btn" color="danger" size="sm">
                      SALES GRAPH
                    </Button>

                    <Link to="#" onClick={this.showItem.bind(this, items._id)}>
                      {items.item_name}
                      &emsp;
                      {items.category}
                      &emsp;
                      {items.stock}
                      &emsp; ${items.cost}
                    </Link>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>

        {/*********** Display one items here ********* */}

        <Container>
          <Card>
            <CardHeader>{_id}</CardHeader>
            <CardTitle>{item_name}</CardTitle>
            <CardBody>{(cost, category)} </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

export default ItemsList;
