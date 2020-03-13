// import React, { Component } from "react";
// import axios from "axios";
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

// class RegisterModal extends Component {
//   state = {
//     modal: false,
//     name: "",
//     email: "",
//     password: "",
//     msg: null,
//     error: null,
//     isAuthenticated: null
//   };

//   toggle = () => {
//     this.setState({ modal: !this.state.modal });
//   };

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = e => {
//     // Prevent Default
//     e.preventDefault();

//     // Header a.k.a config info
//     const config = {
//       header: {
//         "Content-Type": "application/json"
//       }
//     };

//     //
//     console.log(this.state);

//     // Making Request
//     axios
//       .post("/api/auth/register", this.state, config)
//       .then(response => {
//         console.log(response);
//       })
//       .catch(error => {
//         console.log(error);
//       });

//     // Close modal
//     this.toggle();
//   };

//   render() {
//     return (
//       <div>
//         <NavLink className="mr-5" onClick={this.toggle} href="#">
//           Register
//         </NavLink>

//         <Modal isOpen={this.state.modal} toggle={this.toggle}>
//           <ModalHeader toggle={this.toggle}>Register</ModalHeader>
//           <ModalBody>
//             {this.state.msg ? (
//               <Alert color="danger">{this.state.msg}</Alert>
//             ) : null}
//             <Form onSubmit={this.onSubmit}>
//               <FormGroup>
//                 <Container>
//                   <Label for="name">Name</Label>
//                 </Container>

//                 <Input
//                   type="text"
//                   name="name"
//                   id="name"
//                   placeholder="Name"
//                   className="mb-3"
//                   onChange={this.onChange}
//                 />

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

//                 <Button color="dark" style={{ marginTop: "2rem" }} block>
//                   Register
//                 </Button>
//               </FormGroup>
//             </Form>
//           </ModalBody>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default RegisterModal;

/*************** TESTING CONNECTION ************ */

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToggle = useCallback(() => {
    // Clear errors
    setError(null);
    // Revert modal state
    setModal(!modal);
  }, [error, modal]);

  const handleChangeName = e => setName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangePassword = e => setPassword(e.target.value);

  const handleOnSubmit = e => {
    e.preventDefault();

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/auth/register", body, config)
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
        setError("REGISTER_FAIL");
        setMsg(err.response.data.msg || err.response.data.error);
      });
  };

  useEffect(() => {
    // Check for register error
    if (!(error === "REGISTER_FAIL")) {
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
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="email">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={handleChangeName}
              />

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
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
