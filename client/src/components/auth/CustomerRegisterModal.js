import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Audio from "../../assets/audio.png";
import Icon from "../../assets/icon.png";
import Photo from "../../assets/photo.png";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Card,
  CardImg,
  ModalFooter,
} from "reactstrap";

/********************** COMPONENT ********************** */
const CustomerRegisterModal = (props) => {
  /**************** COMPONENT STATES ******************** */

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedPassword, setNestedPassword] = useState(false);
  const [nestedImage, setNestedImage] = useState(false);
  const [nestedAudio, setNestedAudio] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**************** MODAL TOGGLERS ******************** */
  // Main Toggle
  const handleToggle = useCallback(() => {
    // Clear errors
    setError(null);
    // Revert modal state
    setModal(!modal);
  }, [modal]);

  // Secondary Toggle
  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  // Ternary Toggle
  const togglePassword = () => {
    setNestedPassword(!nestedPassword);
  };

  // Ternary Toggle
  const toggleImage = () => {
    setNestedImage(!nestedImage);
  };

  // Ternary Toggle
  const toggleAudio = () => {
    setNestedAudio(!nestedAudio);
  };

  /**************** STATE HANDLERS ******************** */

  const handleChangeFirstName = (e) => setFirstName(e.target.value);
  const handleChangeLastName = (e) => setLastName(e.target.value);
  const handleChangeEmailAddress = (e) => setEmailAddress(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  /**************** FORM SUBMISSION ******************** */

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!first_name || !last_name || !email_address || !(password || file)) {
      setMsg("Sorry you have missing requirement(s). Check all fields again.");
    } else {
      // Request body
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email_address", email_address);
      formData.append("password", password);
      formData.append("file", file);
      console.log(formData);

      /**************** REQUEST SUBMISSION ******************** */
      axios({
        method: "POST",
        url: "/add_customer",
        encType: "multipart/form-data",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setIsAuthenticated(true);
          props.handleSuccessfulAuth(res.data, first_name);
        })
        .catch((err) => {
          console.log(err);
          console.log("Data Response");
          console.log(err.response.data);
          setError("REGISTER_FAIL");
          setMsg("Username already exist");
        });
    }
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
      }
    }
  }, [error, handleToggle, isAuthenticated, modal, email_address]);

  /************************** RENDER ************************ */
  return (
    <div>
      <Button onClick={handleToggle} className="mt-4 mb-3" color="dark" block>
        <h1>Customer Register</h1>
      </Button>

      {/* ***************** PRIMARY MODAL *********************** */}

      <Modal isOpen={modal} toggle={handleToggle}>
        {/* header */}
        <ModalHeader toggle={handleToggle}>Customer Registration</ModalHeader>
        {/* body */}
        <ModalBody>
          {/* Error display */}
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="fistname">First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                className="mb-3"
                onChange={handleChangeFirstName}
              />
              <Label for="last_name">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                className="mb-3"
                onChange={handleChangeLastName}
              />

              <Label for="email_address">Email Address</Label>
              <Input
                type="email"
                name="email_address"
                id="email_address"
                placeholder="Email Address"
                className="mb-3"
                onChange={handleChangeEmailAddress}
              />

              <Button
                color="primary"
                style={{ marginTop: "2rem" }}
                block
                onClick={toggleNested}
              >
                Digital Identication
              </Button>

              {/* ***************** SECORDARY MODEL ********************** */}
              <Modal isOpen={nestedModal} toggle={toggleNested}>
                {/* header */}
                <ModalHeader>Digital Identication</ModalHeader>

                <ModalBody>Please select any one</ModalBody>

                <ModalBody>
                  <Button color="primary" onClick={togglePassword} block>
                    Password
                  </Button>

                  <Button color="primary" onClick={toggleImage} block>
                    Image
                  </Button>

                  <Button color="primary" onClick={toggleAudio} block>
                    Audio
                  </Button>
                </ModalBody>

                <ModalFooter>
                  <Button color="secondary" onClick={toggleNested}>
                    Done
                  </Button>
                </ModalFooter>
              </Modal>

              {/************************ TERTIARY: PASSWORD MODAL********************* */}
              <Modal isOpen={nestedPassword} toggle={togglePassword}>
                {/* header */}
                <ModalHeader>Password</ModalHeader>

                <ModalBody>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="mb-3"
                    onChange={handleChangePassword}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button color="primary" onClick={togglePassword}>
                    Done
                  </Button>
                </ModalFooter>
              </Modal>

              {/************************ TERTIARY: IMAGE MODAL********************* */}
              <Modal isOpen={nestedImage} toggle={toggleImage}>
                {/* header */}
                <ModalHeader>Image Selection</ModalHeader>
                <ModalBody>
                  <Label for="file">File</Label>
                  <Card>
                    <h3>Upload Photo</h3>
                    <CardImg src={Photo} alt={Icon} height="50%" />
                    <Input
                      name="file"
                      id="file"
                      type="file"
                      onChange={handleChangeFile}
                    />
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleImage}>
                    Done
                  </Button>
                </ModalFooter>
              </Modal>

              {/************************ TERTIARY: AUDIO MODAL ********************* */}
              <Modal isOpen={nestedAudio} toggle={toggleAudio}>
                {/* header */}
                <ModalHeader>Audio Recording</ModalHeader>

                <ModalBody>
                  <Card>
                    <h3>Audio</h3>
                    <CardImg src={Audio} alt={Icon} height="50%" />
                    <Input
                      name="file"
                      id="file"
                      type="file"
                      onChange={handleChangeFile}
                    />
                    <audio
                      id="file"
                      name="file"
                      src={file}
                      controls="controls"
                    />
                  </Card>
                </ModalBody>

                <ModalFooter>
                  <Button color="primary" onClick={toggleAudio}>
                    Done
                  </Button>
                </ModalFooter>
              </Modal>

              <Button
                color="dark"
                style={{ marginTop: "2rem" }}
                block
                type="submit"
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

export default CustomerRegisterModal;
