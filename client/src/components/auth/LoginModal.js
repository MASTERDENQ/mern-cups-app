import React, { Component } from "react";
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
  Container,
  NavLink,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";

class LoginModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
    error: null,
    isAuthenticated: null,
    msg: null
  };

  /************  Change Dropdown  **************** */
  toggle = () => {
    // Clear Error
    this.setState({ error: null });
    this.setState({ modal: !this.state.modal });
  };

  /************  Map values to state  **************** */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /************  Change Dropdown  **************** */
  onSubmit = e => {
    // Prevent Default
    e.preventDefault();

    // Header a.k.a config info
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };
    // Body
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(this.state);
    console.log("Body ", user);

    // Making Request
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { user }, { config })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ isAuthenticated: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });

    // Close modal
    // this.toggle();
  };

  componentDidMount = () => {
    // Check for register error
    if (this.state.error) {
      this.setState({ msg: this.state.error.msg.msg });
    } else {
      this.setState({ msg: null });
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (this.state.isAuthenticated) {
        this.toggle();
      }
    }
  };

  render() {
    return (
      <div>
        <Container>
          <NavLink className="ml-5" onClick={this.toggle} href="#">
            Manager Login
          </NavLink>

          <NavLink className="ml-5" onClick={this.toggle} href="#">
            Customer Login
          </NavLink>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form>
              <FormGroup>
                <Container>
                  <Label for="email">Email</Label>
                </Container>

                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Container>
                  <Label for="password">Password</Label>
                </Container>

                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  type="submit"
                  onSubmit={this.onSubmit}
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
