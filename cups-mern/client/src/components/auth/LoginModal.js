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

class RegisterModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
    error: null,
    isAuthenticated: null
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    // Prevent Default
    e.preventDefault();

    // Header a.k.a config info
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };

    const body =
      //
      console.log(this.state);

    // Making Request
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state, config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink className="mr-5" onClick={this.toggle} href="#">
          Lgin
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
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

                <Button color="dark" style={{ marginTop: "2rem" }} block>
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

export default RegisterModal;
