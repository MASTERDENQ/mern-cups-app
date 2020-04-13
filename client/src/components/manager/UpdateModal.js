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
  /**************** COMPONENT STATES ******************** */
  state = {
    modal: false,
    nestedModal: false,
    field: "",
    new_value: "",
    msg: null
  };

  /**************** MODAL TOGGLERS ******************** */
  // Main Toggle
  toggle = () => {
    console.log(this.props.id, "Update");
    this.setState({ modal: !this.state.modal });
  };

  // Secondary Toggle
  toggleNested = () => {
    this.setState({ msg: null });
    this.setState({ nestedModal: !this.state.nestedModal });
  };

  /**************** STATE HANDLERS ******************** */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setField = field => {
    this.setState({ field: field });
  };

  /**************** FORM SUBMISSION ******************** */
  onSubmit = e => {
    // Prevent Default
    e.preventDefault();

    if (!this.state.new_value && this.state.new_value < 0) {
      this.setState({ msg: "Sorry, incorrect entry. Try again" });
    } else {
      // Header a.k.a config info
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      };
      // Body
      const body = {
        id: this.props.id,
        new_value: this.state.new_value
      };

      console.log(body);

      // Making Request
      axios
        .post(`testdb/edit_item/${this.state.field}`, body, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          // Close modal
          this.toggle();
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
          this.setState({ msg: err.response.data });
        });
    }
  };

  render() {
    console.log(this.props.id);

    return (
      <div>
        <Link to="#" onClick={this.toggle}>
          UPDATE
        </Link>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Update Menu Options</ModalHeader>
          <ModalBody>Click one to Update</ModalBody>
          <ModalBody>
            <Button
              color="dark"
              style={{ marginTop: "2rem" }}
              block
              onClick={() => {
                this.toggleNested();
                this.setField("cost");
              }}
            >
              Cost Update
            </Button>
            <Button
              color="dark"
              style={{ marginTop: "2rem" }}
              block
              onClick={() => {
                this.toggleNested();
                this.setField("stock");
              }}
            >
              Stock Update
            </Button>
          </ModalBody>

          <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
            <ModalHeader>Update </ModalHeader>
            <ModalBody>
              {this.state.msg ? (
                <Alert color="danger">{this.state.msg}</Alert>
              ) : null}

              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Container>
                    <Label for="new_value">New Value</Label>
                  </Container>

                  <Input
                    type="new_value"
                    name="new_value"
                    id="new_value"
                    placeholder="Enter new value here."
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
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;
