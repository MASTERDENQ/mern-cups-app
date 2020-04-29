import React from "react";
// import { Link } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder";
import {
  Container,
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const ReviewOrder = (props) => {
  console.log(props);

  return (
    <Container>
      <ListGroup className="mb-3">
        <ListGroupItem>
          <Row>
            <Col>USER: {props.username}</Col>
            <Col>A/C BALANCE: {props.acc_bal}</Col>
            <Col>SUM TOTAL: {props.sumTotal}</Col>
          </Row>
        </ListGroupItem>
      </ListGroup>

      <ListGroup>
        <ListGroupItem>
          <div>
            {props.orderedItems.map((order) => (
              <div key={order.id}>
                <Row>
                  {/* <Col>&times;</Col> */}
                  <Col>NAME: {order.name}</Col>
                  <Col>AMT: {order.quantity}</Col>
                  <Col>COST: {order.cost}</Col>
                  <Col>TOTAL: {order.total}</Col>
                  {/* <Col>{order.cost}</Col> */}
                </Row>
              </div>
            ))}
          </div>
        </ListGroupItem>
      </ListGroup>
      <Row></Row>

      <div>
        <ConfirmOrder order={props.orderedItems} />
      </div>

      <div>
        <Link to="/menu">
          <Button
            className="mt-4 mb-3"
            color="dark"
            block
            onClick={() => {
              props.changeView();
            }}
          >
            CANCEL
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default ReviewOrder;
