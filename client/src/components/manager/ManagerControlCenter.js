import React from "react";
import "../../css/ManagerControlStyle.css";
import add from "../../assets/add-item.png";
import viewEdit from "../../assets/view-edit.png";
import graph from "../../assets/graph.png";

import { Link } from "react-router-dom";
import { Container, Card, CardImg, Col, Row, Alert } from "reactstrap";

const ManagerControlCenter = (props) => {
  const pass = props.loggedInStatus;

  /******************************* RENDER ******************************* */
  if (pass === "NOT_LOGGED_IN") {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
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
          <Col>
            {" "}
            {/* Add Button */}
            <Link to="/add">
              <Card>
                <CardImg src={add} alt="Avatar" />
                <div>
                  <h4>
                    <b>ADD MENU ITEM</b>
                  </h4>
                </div>
              </Card>
            </Link>
          </Col>

          <Col>
            {" "}
            {/* Edit Button */}
            <Link to="/list">
              <Card>
                <CardImg src={viewEdit} alt="Avatar" />

                <div>
                  <h4>
                    <b>VIEW/EDIT MENU ITEM</b>
                  </h4>
                </div>
              </Card>
            </Link>
          </Col>

          <Col>
            {/* Gragh Button */}
            <Link to="/chart">
              <Card>
                <CardImg src={graph} alt="Avatar" />

                <div>
                  <h4>
                    <b>VIEW CHARTS</b>
                  </h4>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ManagerControlCenter;
