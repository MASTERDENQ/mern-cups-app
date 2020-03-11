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
  Alert,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";

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
    // Body
    const body = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(this.state);

    // Making Request
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { body }, { config })
      .then(res => {
        console.log(res);
        console.log(res.data);
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
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Login
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.toggle} href="#">
              Customer
            </DropdownItem>
            <DropdownItem onClick={this.toggle} href="#">
              Manager
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* <NavLink className="ml-5" onClick={this.toggle} href="#">
          Login
        </NavLink> */}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
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
                <Link to="/list">
                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                    type="submit"
                    onSubmit={this.onSubmit}
                  >
                    Login
                  </Button>
                </Link>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
