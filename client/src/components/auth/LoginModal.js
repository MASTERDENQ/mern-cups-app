// import React, { Component } from "react";
import axios from "axios";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Container,
//   NavLink,
//   Alert
// } from "reactstrap";
// import { Link } from "react-router-dom";

// class LoginModal extends Component {
// state = {
//   modal: false,
//   email: "",
//   password: "",
//   error: null,
//   msg: null,
//   isAuthenticated: null,
//   isLoading: false,
//   user: null
// };

//   /************  Change Dropdown  **************** */
//   toggle = () => {
//     // Clear Error
//     this.setState({ error: null });
//     this.setState({ modal: !this.state.modal });
//   };

//   /************  Map values to state  **************** */
//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   /************  Change Dropdown  **************** */
//   onSubmit = e => {
//     const email = this.state.email;
//     const password = this.state.password;

//     // Prevent Default
//     e.preventDefault();

//     // Header a.k.a config info
//     const config = {
//       header: {
//         "Content-Type": "application/json"
//       }
//     };

//     // Request body
//     const body = JSON.stringify({ email, password });

//     console.log(this.state);
//     console.log("Body ", body);

//     // Making Request
//     axios
//       .post("/api/auth/login", { body }, { config })
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//         this.setState({ isAuthenticated: true });
//       })
//       .catch(err => {
//         console.log(err);
//         this.setState({ error: err });
//       });

//     // Close modal
//     // this.toggle();
//   };

//   componentDidMount = () => {
//     // Check for register error
//     if (this.state.error) {
//       this.setState({ msg: this.state.error.msg.msg });
//     } else {
//       this.setState({ msg: null });
//     }

//     // If authenticated, close modal
//     if (this.state.modal) {
//       if (this.state.isAuthenticated) {
//         this.toggle();
//       }
//     }
//   };

//   render() {
//     return (
//       <div>
//         <Container>
//           <NavLink className="ml-5" onClick={this.toggle} href="#">
//             Manager Login
//           </NavLink>

//           <NavLink className="ml-5" onClick={this.toggle} href="#">
//             Customer Login
//           </NavLink>
//         </Container>

//         <Modal isOpen={this.state.modal} toggle={this.toggle}>
//           <ModalHeader toggle={this.toggle}>Login</ModalHeader>
//           <ModalBody>
//             {this.state.msg ? (
//               <Alert color="danger">{this.state.msg}</Alert>
//             ) : null}
//             <Form>
//               <FormGroup>
//                 <Container>
//                   <Label for="email">Email</Label>
//                 </Container>

//                 <Input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Email"
//                   className="mb-3"
//                   onChange={this.onChange}
//                 />

//                 <Container>
//                   <Label for="password">Password</Label>
//                 </Container>

//                 <Input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="Password"
//                   className="mb-3"
//                   onChange={this.onChange}
//                 />

//                 <Button
//                   color="dark"
//                   style={{ marginTop: "2rem" }}
//                   block
//                   type="submit"
//                   onSubmit={this.onSubmit}
//                 >
//                   Login
//                 </Button>
//               </FormGroup>
//             </Form>
//           </ModalBody>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default LoginModal;

/*************** TESTING CONNECTION ************ */

import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
// import { connect } from "react-redux";
// import { login } from "../../flux/actions/authActions";
// import { clearErrors } from "../../flux/actions/errorActions";
// import { ILoginModal, ITarget, IAuthReduxProps } from "../../types/interfaces";

const LoginModal = () => {
  //   {
  //   isAuthenticated,
  //   error,
  //   login,
  //   clearErrors
  // }: ILoginModal) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToggle = useCallback(() => {
    // Clear errors
    // clearErrors();
    setError(null);
    setModal(!modal);
  }, [error, modal]);

  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  const handleOnSubmit = e => {
    e.preventDefault();

    // const user = { email, password };

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/auth/login", body, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setIsAuthenticated(true);
      })
      .catch(err => {
        console.log("Data Response");
        console.log(err.response.data);
        console.log("Status Response");
        console.log(err.response.status);
        setError("LOGIN_FAIL");
        setMsg(err.response.data.msg);
      });

    // Attempt to login
    // login(user);
  };

  useEffect(() => {
    // Check for register error
    if (!(error === "LOGIN_FAIL")) {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleChangeEmail}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              <Button
                color="dark"
                style={{ marginTop: "2rem" }}
                block
                onClick={handleOnSubmit}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

// const mapStateToProps = (state: IAuthReduxProps) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

export default // connect(mapStateToProps, { login, clearErrors })
LoginModal;

// export const login = ({ email, password }) => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   // Request body
//   const body = JSON.stringify({ email, password });

//   axios
//     .post("/api/auth/login", body, config)
//     .then(res => {
//       console.log(res);
//       console.log(res.data);
//     })
//     .catch(err => {
//       console.log(err.response.data);
//       console.log(err.response.status);
//       setError("LOGIN_FAIL");
//     });
// };

// // RETURN ERRORS
// export const returnErrors = (msg, status, i) => {
//   return {
//     type: GET_ERRORS,
//     payload: { msg, status, id }
//   };
// };
