import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
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
  NavLink,
  Alert,
  Card,
  CardImg,
  ModalFooter
} from "reactstrap";

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const CustomerRegisterModal = () => {
  /**************** COMPONENT STATES ******************** */

  const [modal, setModal] = useState(false);
  const [nestedPassword, setNestedPassword] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedImage, setNestedImage] = useState(false);
  const [nestedAudio, setNestedAudio] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [digital_id, setDigitalId] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

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

  const handleChangeFirstName = e => setFirstName(e.target.value);
  const handleChangeLastName = e => setLastName(e.target.value);
  const handleChangeEmailAddress = e => setEmailAddress(e.target.value);
  const handleChangeDigitalId = e => setDigitalId(e.target.value);

  /**************** FORM SUBMISSION ******************** */

  const handleOnSubmit = e => {
    e.preventDefault();

    // Check for empty fields
    if (!first_name || !last_name || !email_address || !digital_id) {
      setMsg("Sorry you have missing require(s). Check again.");
    } else {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      // Request body
      const body = JSON.stringify({
        first_name,
        last_name,
        email_address,
        digital_id
      });

      /**************** REQUEST SUBMISSION ******************** */
      axios
        .post("/testdb/add_customer", body, config)
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
          setMsg(err.response.data.message || err.response.data.error);
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
      console.log("Registration Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch(e => console.error(e));
    }
  };

  // Stop the recording of audio
  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const digital_id = URL.createObjectURL(blob);
        setDigitalId(digital_id);
        setIsRecording(false);
      })
      .catch(e => console.log(e));
  };

  /************************** RENDER ************************ */
  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Customer Register
      </NavLink>

      {/* ***************** PRIMARY MODAL *********************** */}

      <Modal isOpen={modal} toggle={handleToggle}>
        {/* header */}
        <ModalHeader toggle={handleToggle}>Customer Registration</ModalHeader>
        {/* body */}
        <ModalBody>
          {/* Error display */}
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="fist_name">First Name</Label>
              <Input
                type="first_name"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                className="mb-3"
                onChange={handleChangeFirstName}
              />
              <Label for="last_name">Last Name</Label>
              <Input
                type="last_name"
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
                    name="digital_id"
                    id="digital_id"
                    placeholder="Password"
                    className="mb-3"
                    onChange={handleChangeDigitalId}
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
                      name="digital_id"
                      id="digital_id"
                      type="file"
                      onChange={handleChangeDigitalId}
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
                        id="digital_id"
                        name="digital_id"
                        src={digital_id}
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
