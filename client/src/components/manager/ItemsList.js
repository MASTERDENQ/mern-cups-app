import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../css/ItemsListStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ViewFile from "./itemModels/ViewFile";
import UpdateModal from "./itemModels/UpdateModal";
import DeleteModal from "./itemModels/DeleteModal";

class ItemsList extends Component {
  /**************** COMPONENT STATES ******************** */

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      id: "",
      isLoaded: false,
    };
  }

  /*********  Retrieve id for Single Request ***************/
  getId = (_id) => {
    this.setState({ id: _id });
  };

  /************** Request To Retrieve All Items ***************** */

  componentDidMount() {
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
    const pass = this.props.loggedInStatus;

    if (pass === "NOT _LOGGED_IN") {
      return (
        <div>
          <h1>
            YOU ARE NOT LOGGED IN. PLEASE <Link to="/">LOGIN</Link>
          </h1>
        </div>
      );
    } else {
      return (
        <div>
          {/*********** Display all items here ********* */}

          <Container>
            <h1>
              <Alert color="dark">VIEW/EDIT MENU ITEMS</Alert>
            </h1>
            <Row>
              <Col>
                <Link to="/add">
                  <Button className="mt-4 mb-3" color="dark" block>
                    ADD ITEM
                  </Button>
                </Link>
              </Col>

              <Col>
                <Link to="/chart">
                  <Button className="mt-4 mb-3" color="dark" block>
                    VIEW CHARTS
                  </Button>
                </Link>
              </Col>
            </Row>

            <Alert color="info">
              If you do decide to edit, please use browser reloader to RELOAD to
              view changes.
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
                            {/* DELETE BUTTON */}
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={this.getId.bind(this, items._id)}
                            >
                              <DeleteModal id={this.state.id} />
                            </Button>

                            {/* UPDATE BUTTON */}
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
                          </Col>

                          <Col>NAME: {items.item_name}</Col>
                          <Col>CATEGORY: {items.category}</Col>
                          <Col>STOCK: {items.stock}</Col>
                          <Col>UNIT COST: ${items.cost}.00</Col>
                        </Row>
                      </b>
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>

            <Link to="/control">
              <Button className="mt-4 mb-3" color="dark" block>
                MANAGER CONTROL CENTER
              </Button>
            </Link>
          </Container>
        </div>
      );
    }
  }
}

export default ItemsList;
