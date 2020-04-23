import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
import Audio from "../../assets/audio.png";
import Icon from "../../assets/icon.png";
import Photo from "../../assets/photo.png";
// import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  // NavLink,
  Alert,
  Card,
  CardImg,
  ModalFooter,
} from "reactstrap";

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const CustomerLoginModal = (props) => {
  /**************** COMPONENT STATES ******************** */

  const [modal, setModal] = useState(false);
  const [nestedPassword, setNestedPassword] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedImage, setNestedImage] = useState(false);
  const [nestedAudio, setNestedAudio] = useState(false);
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  /**************** MODAL TOGGLER ******************** */

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

  const handleChangeEmailAddress = (e) => setEmailAddress(e.target.value);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  /**************** FORM SUBMISSION ******************** */

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!email_address || !(file || password)) {
      setMsg("Please enter email and digital id.");
    } else {
      // Request body
      const body = {
        email_address,
        password,
        file,
      };

      /**************** REQUEST SUBMISSION ******************** */
      axios({
        method: "POST",
        url: "/login_customer",
        encType: "multipart/form-data",
        data: body,
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setIsAuthenticated(true);
          props.handleSuccessfulAuth(res.config.data, email_address);
        })
        .catch((err) => {
          console.log("err", err);
          console.log("\nResponse");
          console.log(err.response);
          console.log("\nStatus Response");
          console.log(err.response.status);
          setError("LOGIN_FAIL");
          setMsg(err.response.data);
        });
    }
  };

  /**************** RENDER AND RERENDER ******************** */

  useEffect(() => {
    // Check for login error & clear message
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

  useEffect(() => {
    // React-Mic Permissions Check
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("\nRegistration Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("\nRegistration Permission Denied");
        setIsBlocked(false);
      }
    );
  }, []);

  /**************** AUDIO RECORDING ******************** */

  // Start the recording of audio
  const start = () => {
    if (isBlocked) {
      console.log("Login Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  // Stop the recording of audio
  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = URL.createObjectURL(blob);
        setFile(file);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  /************************* RENDER ***************************** */

  return (
    <div>
      {/* <NavLink onClick={handleToggle} href="#">
        Customer Login
      </NavLink> */}

      <Button onClick={handleToggle} className="mt-4 mb-3" color="dark" block>
        <h1>Customer Login</h1>
      </Button>

      {/* ***************** PRIMARY MODAL *********************** */}

      <Modal isOpen={modal} toggle={handleToggle}>
        {/* header */}
        <ModalHeader toggle={handleToggle}>Customer Login</ModalHeader>
        {/* body */}
        <ModalBody>
          {/* Error display */}
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form>
            <FormGroup>
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
                color="dark"
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
                  <Label for="digital_id">Password</Label>
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

                    <div className="audio-css">
                      <Button
                        onClick={start}
                        disabled={isRecording}
                        type="button"
                      >
                        Record
                      </Button>

                      <Button
                        onClick={stop}
                        disabled={!isRecording}
                        type="button"
                      >
                        Stop
                      </Button>
                      <audio
                        id="file"
                        name="file"
                        src={file}
                        controls="controls"
                      />
                    </div>
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

export default CustomerLoginModal;
