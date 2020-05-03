import React, { Fragment, useState } from "react";
// import avatar from "../assets/avatar.jpg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import Logout from "./auth/logout/Logout";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const guestDisplay = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{"Please Signup or Signin."}</strong>
        </span>
      </NavItem>
    </Fragment>
  );

  const authDisplay = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {props.username ? `Welcome ${props.username}` : "Welcome Customer"}
          </strong>
        </span>
      </NavItem>

      <NavItem>
        <Logout label="Logout" />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">C.U.P.S</NavbarBrand>

          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen}>
            <Nav className="ml-auto" navbar>
              {props.username ? authDisplay : guestDisplay}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
