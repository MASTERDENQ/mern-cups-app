import React, { Fragment, useEffect, useState, useCallback } from "react";
// import '../css/NavBarStyle.css';
// import avatar from "../assets/avatar.jpg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  Container,
} from "reactstrap";
import ManagerRegisterModal from "./auth/ManagerRegisterModal";
// import TestUpload from "./auth/TestUpload";
import ManagerLoginModal from "./auth/ManagerLoginModal";
import CustomerRegisterModal from "./auth/CustomerRegisterModal";
import CustomerLoginModal from "./auth/CustomerLoginModal";
import Logout from "./auth/Logout";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {username ? `Welcome ${username}` : "Welcome Customer"}
          </strong>
        </span>
      </NavItem>

      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <CustomerRegisterModal />
        {/* <TestUpload /> */}
      </NavItem>

      <NavItem>
        <CustomerLoginModal />
      </NavItem>

      <NavItem>
        <ManagerRegisterModal />
      </NavItem>

      <NavItem>
        <ManagerLoginModal />
      </NavItem>
    </Fragment>
  );

  // useEffect(() => {
  //   setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  //   setUsername(localStorage.getItem("username"));

  //   console.log(isAuthenticated, username);
  // }, [isAuthenticated, username]);

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">C.U.P.S</NavbarBrand>

          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen}>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default NavBar;
