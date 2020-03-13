import React, { Component } from "react";
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
  Container
} from "reactstrap";
import ManagerRegisterModal from "./auth/ManagerRegisterModal";
import ManagerLoginModal from "./auth/ManagerLoginModal";
import CustomerRegisterModal from "./auth/CustomerRegisterModal";
import CustomerLoginModal from "./auth/CustomerLoginModal";
import Logout from "./auth/Logout";

export class NavBar extends Component {
  state = {
    isOpen: true
  };

  toggle = () =>
    this.setState({
      isOpen: !this.state.isOpen
    });

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">C.U.P.S</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <CustomerRegisterModal />
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

                <NavItem>
                  <Logout />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

// const NavBar = () => {
//     return (
//         <nav className="NavBar">

//             <p className="Username">
//                 Username
//             </p>

//             <img
//                 src={avatar}
//                 className="NavBarAvatar"
//                 alt="Avatar"
//             />

//         </nav>
//     );
// };

export default NavBar;
