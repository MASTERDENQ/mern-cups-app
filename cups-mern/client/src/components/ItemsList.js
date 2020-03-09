import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

import "../css/ItemsListStyle.css";
import itemReducer from "../reducers/itemReducer";

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
                id,
                name,
                stock,
                category,
                cost,
                image,
                asl_image,
                audio
              }) => (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem
                    className="container"
                    style={{ marginRight: "4rem" }}
                  >
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, id)}
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

ItemsList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ItemsList);
