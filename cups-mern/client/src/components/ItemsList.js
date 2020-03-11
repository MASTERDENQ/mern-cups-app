import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/ItemsListStyle.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Item from "./Item";

class ItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      id: ""
    };
  }

  // showItem = id => {
  //   {
  //     <Item id={id} />;
  //   }
  // };

  // Delete One Item
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

  // Load all Items
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
    return (
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

                  <Link
                    to={{
                      pathname: "/list/item",
                      state: {
                        id: items.id
                      }
                    }}
                  >
                    {items.name}
                  </Link>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ItemsList;
