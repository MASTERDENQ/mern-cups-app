import React, { Component } from "react";
// import '../css/NavBarStyle.css';
import avatar from "../assets/avatar.jpg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";

export class NavBar extends Component {
  state = {
    isOpen: false
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
                  <RegisterModal />
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
