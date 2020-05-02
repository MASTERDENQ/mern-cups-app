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
  Alert,
} from "reactstrap";

const ReviewOrder = (props) => {
  console.log(props);
  return (
    <Container>
      <Alert color="dark">
        <h1>CHART REVIEW</h1>
      </Alert>
      <ListGroup className="mb-3">
        <ListGroupItem>
          <Row>
            <Col>USER: {props.username}</Col>
            <Col>A/C BALANCE: ${props.acc_bal}</Col>
            <Col>SUM TOTAL: ${props.sumTotal}</Col>
          </Row>
        </ListGroupItem>
      </ListGroup>

      <div>
        {props.orderedItems.map((order) => (
          <div key={order.id}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  {/* <Col>&times;</Col> */}
                  <Col>NAME: {order.name}</Col>
                  <Col>AMT: {order.quantity}</Col>
                  <Col>UNIT COST: ${order.cost}</Col>
                  <Col>TOTAL COST: ${order.total}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </div>
        ))}
      </div>

      <div>
        <ConfirmOrder order={props.orderedItems} />
      </div>

      <div>
        {/* <Link to="/menu"> */}
        <Button
          className="mt-4 mb-3"
          color="danger"
          block
          onClick={() => {
            props.changeView("clear");
          }}
        >
          CANCEL
        </Button>
        {/* </Link> */}
      </div>
    </Container>
  );
};

export default ReviewOrder;
