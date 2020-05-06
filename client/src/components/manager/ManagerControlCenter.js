import React from "react";
import "../../css/ManagerControlStyle.css";
import add from "../../assets/add-item.png";
import viewEdit from "../../assets/view-edit.png";
import graph from "../../assets/graph.png";

import { Link } from "react-router-dom";
import { Container, Card, CardImg, Col, Row, Alert } from "reactstrap";

var ControlCenterButton = (linkName, imgSrc, buttonText) => {
  return (
    <Col>
      <Link to={"/" + linkName}>
        <Card>
          <CardImg src={imgSrc} alt="Avatar" />
          <div>
            <h4>
              <b>{buttonText}</b>
            </h4>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

const ManagerControlCenter = (props) => {
  const pass = props.loggedInStatus;

  /******************************* RENDER ******************************* */
  if (pass === "NOT_LOGGED_IN") {
    return (
      <div>
        <h1>
          YOU ARE NOT LOGGED IN. PLEASE <Link to="/">LOGIN</Link>
        </h1>
      </div>
    );
  } else {
    return (
      <Container>
        <Alert color="dark" style={{ marginBottom: "3rem" }}>
          <h1>MANAGER CONTROL CENTER</h1>
        </Alert>

        <Row>
          {/* Add Button */}
          {ControlCenterButton("add", add, "ADD MENU ITEMS")}
          {/* Edit Button */}
          {ControlCenterButton("list", viewEdit, "VIEW/EDIT MENU ITEMS")}
          {/* Graph Button */}
          {ControlCenterButton("chart", graph, "VIEW CHARTS")}
        </Row>
      </Container>
    );
  }
};

export default ManagerControlCenter;
