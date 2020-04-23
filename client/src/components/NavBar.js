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
import Logout from "./auth/Logout";

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
        <Logout />
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

// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loggedInStatus: "NOT_LOGGED_IN",
//       user: {},
//       username: "",
//       isOpen: true,
//     };
//     this.handleLogin = this.handleLogin.bind(this);
//     this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
//   }

//   handleLogin(data, username) {
//     this.setState({
//       loggedInStatus: "LOGGED_IN",
//       user: data,
//       username: username,
//     });
//   }

//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen,
//     });
//   }

//   authLinks = (
//     <Fragment>
//       {/* <NavItem>
//         <span className="navbar-text mr-3">
//           <strong>
//             {this.state.username
//               ? `Welcome ${this.state.username}`
//               : "Welcome Customer"}
//           </strong>
//         </span>
//       </NavItem> */}

//       <NavItem>
//         <Logout />
//       </NavItem>
//     </Fragment>
//   );

//   guestLinks = (
//     <Fragment>
//       <NavItem>
//         <Route
//           render={(props) => (
//             <CustomerRegisterModal
//               {...props}
//               handleLogin={this.handleLogin}
//               loggedInStatus={this.state.loggedInStatus}
//             />
//           )}
//         />

//         {/* <TestUpload /> */}
//       </NavItem>

//       <NavItem>
//         <CustomerLoginModal />
//       </NavItem>

//       <NavItem>
//         <ManagerRegisterModal />
//       </NavItem>

//       <NavItem>
//         <ManagerLoginModal />
//       </NavItem>
//     </Fragment>
//   );

//   render() {
//     return (
//       <div>
//         <Navbar color="dark" dark expand="sm" className="mb-5">
//           <Container>
//             <NavbarBrand href="/">C.U.P.S</NavbarBrand>

//             <NavbarToggler onClick={this.toggle} />

//             <Collapse isOpen={this.state.isOpen}>
//               <Nav className="ml-auto" navbar>
//                 {this.state.loggedInStatus === "LOGGED_IN"
//                   ? this.authLinks
//                   : this.guestLinks}
//               </Nav>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </div>
//     );
//   }
// }

export default NavBar;
