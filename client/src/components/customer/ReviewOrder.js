import React from "react";
// import { Link } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder";
import { Container, Button } from "reactstrap";

const ReviewOrder = (props) => {
  console.log(props);
  return (
    <Container>
      {props.orderedItems.map((order) => (
        <div key={order.id}>
          {order.value}
          <br />
          {order.name}
          <br />
          <br />
        </div>
      ))}

      <Container>
        <ConfirmOrder order={props.orderedItems} />
      </Container>

      <Container>
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
      </Container>
    </Container>
  );
};

export default ReviewOrder;
