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
  Alert,
} from "reactstrap";

const ManagerRegisterModal = () => {
  /**************** COMPONENT STATES ******************** */

  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**************** MODAL TOGGLER ******************** */

  const handleToggle = useCallback(() => {
    // Clear errors
    setError(null);
    // Revert modal state
    setModal(!modal);
  }, [modal]);

  /**************** STATE HANDLERS ******************** */

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  /**************** FORM SUBMISSION ******************** */

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ username, password });

    /**************** REQUEST SUBMISSION ******************** */
    axios
      .post("/add_manager", body, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("Data Response");
        console.log(err.response.data);
        console.log("Status Response");
        console.log(err.response.status);
        setError("REGISTER_FAIL");
        setMsg(err.response.data);
      });
  };

  /**************** RENDER AND RERENDER ******************** */

  useEffect(() => {
    // Check for register error
    if (!(error === "REGISTER_FAIL")) {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
        // localStorage.setItem("isAuthenticated", true);
        // localStorage.getItem("username", username);
      }
    }
  }, [error, handleToggle, isAuthenticated, modal, username]);
  /************************** RENDER ************************ */

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Manager Register
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Manager Registration</ModalHeader>
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
                onChange={handleChangeUsername}
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

export default ManagerRegisterModal;
