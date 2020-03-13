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
  CardBody
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/ItemsListStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";

class ItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      id: "",
      item: []
    };
  }

  onClick = e => {
    if (!this.state.id) {
      e.preventDefault();
    }
  };

  /*********  Retrieve id for Single Request ***************/

  showItem = id => {
    this.setState({ id: id });
    this.requestDetail(id);
  };

  /*********  Request Detail For One Item ***************/

  requestDetail = id => {
    console.log(`Request Details for Item ${id}`);
    //Request Items
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        console.log(res);
        this.setState({ item: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  /*****************  Delete Request for One Item ***************/

  deleteItem = id => {
    console.log(`Delete Request for Item ${id}`);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /*********  Request to edit one Item ***************/

  updateItem = (id, type) => {
    console.log(`Delete Request for Item ${id}`, type);
    axios
      .patch(`https://jsonplaceholder.typicode.com/users/${id}`, type)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /************** Request To Retrieve All Items Names ***************** */

  componentDidMount() {
    console.log();
    //Request Items
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        console.log(res);
        this.setState({ items: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // Destructure item
    const { id, name, email, website } = this.state.item;

    return (
      <div>
        {/*********** Display all items here ********* */}

        <Container>
          <ListGroup>
            <TransitionGroup className="items-list">
              {this.state.items.map(items => (
                <CSSTransition key={items.id} timeout={500} classNames="fade">
                  <ListGroupItem
                    className="container"
                    style={{ marginRight: "4rem" }}
                  >
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.deleteItem.bind(this, items.id)}
                    >
                      &times;
                    </Button>

                    <Link to="#" onClick={this.showItem.bind(this, items.id)}>
                      {items.name}
                    </Link>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
          <Link to="/add">
            <Button className="mt-4" color="dark">
              ADD ITEM
            </Button>
          </Link>
        </Container>

        {/*********** Display one items here ********* */}

        <Container>
          <Card>
            <CardHeader>{id}</CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardBody>{(email, website)} </CardBody>
          </Card>
          {/* <Link to="update" onClick={this.onClick}></Link> */}
          <Button className="mt-4" color="dark">
            <UpdateModal id={id} />
          </Button>
        </Container>
      </div>
    );
  }
}

export default ItemsList;
