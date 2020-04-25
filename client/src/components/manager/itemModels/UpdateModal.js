import React, { useState } from "react";
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
  Alert,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const UpdateModal = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [field, setField] = useState("");
  const [new_value, setNewValue] = useState("");
  const [msg, setMsg] = useState(null);

  /**************** MODAL TOGGLERS ******************** */
  // Main Toggle
  const toggle = () => {
    console.log(props.id, "Update");
    setModal(!modal);
  };

  // Secondary Toggle
  const toggleNested = () => {
    setMsg(null);
    setNestedModal(!nestedModal);
  };

  /**************** STATE HANDLERS ******************** */
  const onChange = (e) => setNewValue(e.target.value);
  const setFieldValue = (field) => setField(field);

  /**************** FORM SUBMISSION ******************** */
  const onSubmit = (e) => {
    // Prevent Default
    e.preventDefault();

    if (!new_value && new_value < 0) {
      setMsg("Sorry, incorrect entry. Try again");
    } else {
      // Header a.k.a config info
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      // Body
      const body = {
        id: props.id,
        new_value: new_value,
      };

      console.log(body);

      // Making Request
      axios
        .post(`/edit_item/${field}`, body, config)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setMsg("UPDATE_SUCCESSFUL");
          // Close modal
          toggle();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setMsg(err.response.data);
        });
    }
  };

  if (msg === "UPDATE_SUCCESSFUL") {
    return <Redirect to="/list" />;
  } else {
    return (
      <div>
        <Link to="#" onClick={toggle}>
          UPDATE
        </Link>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>Update Menu Options</ModalHeader>
          <ModalBody>Click one to Update</ModalBody>
          <ModalBody>
            <Button
              color="dark"
              style={{ marginTop: "2rem" }}
              block
              onClick={() => {
                toggleNested();
                setFieldValue("cost");
              }}
            >
              Cost Update
            </Button>
            <Button
              color="dark"
              style={{ marginTop: "2rem" }}
              block
              onClick={() => {
                toggleNested();
                setFieldValue("stock");
              }}
            >
              Stock Update
            </Button>
          </ModalBody>

          <Modal isOpen={nestedModal} toggle={toggleNested}>
            <ModalHeader>Update </ModalHeader>
            <ModalBody>
              {msg ? <Alert color="danger">msg</Alert> : null}

              <Form onSubmit={onSubmit}>
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
                    onChange={onChange}
                  />

                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                    type="submit"
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
};

export default UpdateModal;
