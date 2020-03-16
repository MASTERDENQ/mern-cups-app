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
  // NavLink,
  Alert
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  // NavItem,
  // Navbar
} from "reactstrap";
import { Link } from "react-router-dom";

class RegisterModal extends Component {
  state = {
    modal: false,
    stock: "",
    cost: "",
    msg: null,
    error: null
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
      id: this.props.id,
      stock: this.state.stock,
      cost: this.state.cost
    };

    console.log(body);

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
        <Link to="#" onClick={this.toggle} href="#">
          UPDATE
        </Link>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Container>
                  <Label for="email">Cost</Label>
                </Container>

                <Input
                  type="cost"
                  name="cost"
                  id="cost"
                  placeholder="Cost"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Container>
                  <Label for="password">Stock</Label>
                </Container>

                <Input
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="stock"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Link to="#">
                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                    type="submit"
                    onSubmit={this.onSubmit}
                  >
                    Submit
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
