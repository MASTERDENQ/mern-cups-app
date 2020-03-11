import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../css/ItemsListStyle.css";

class ItemsList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="items-list">
            {items.map(
              ({
                _id,
                name,
                stock,
                category,
                cost,
                image,
                asl_image,
                audio
              }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem
                    className="container"
                    style={{ marginRight: "4rem" }}
                  >
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                    {name}
                    {category}
                    {stock}
                    {cost}
                    {image}
                    {asl_image}
                    {audio}
                  </ListGroupItem>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ItemsList;
