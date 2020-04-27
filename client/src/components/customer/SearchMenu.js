import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CardImg,
  Card,
  Form,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";

const SearchMenu = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [modal, setModal] = useState(false);
  const [nestedItemName, setNestedItemName] = useState(false);
  const [nestedASL, setNestedASL] = useState(false);
  const [nestedAudio, setNestedAudio] = useState(false);
  const [item_name, setItemName] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  /**************** MODAL TOGGLERS ******************** */
  // Main Toggle
  const toggle = () => {
    setModal(!modal);
  };

  // Secondary Toggle
  const toggleItemName = (type) => {
    setNestedItemName(!nestedItemName);
    setType(type);
  };

  // Secondary Toggle
  const toggleASL = (type) => {
    setNestedASL(!nestedASL);
    setType(type);
  };

  // Secondary Toggle
  const toggleAudio = (type) => {
    setNestedAudio(!nestedAudio);
    setType(type);
  };

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => setItemName(e.target.value);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  /**************** FORM SUBMISSION ******************** */
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!item_name || !file) {
      setMsg("Sorry you have missing requirement. Please select one.");
    } else {
      const formData = new FormData();
      formData.append("item_name", item_name);
      formData.append("file", file);

      // Making Request
      axios
        .get(`/search_items/${type}`)
        .then((res) => {
          console.log(res);
          setMsg("LOADED_SUCCESSFULLY");
          console.log(msg);
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

  return (
    <div>
      <Button
        onClick={toggle}
        style={{ color: "white" }}
        activestyle={{ color: "red" }}
        block
        color="primary"
      >
        SEARCH
      </Button>

      {/************************ PRIMARY: IMAGE MODAL********************* */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>SEARCH FOR MENU ITEM</ModalHeader>
        <ModalBody>
          Serch by item name, asl or audio file
          {/* Error display */}
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <ModalBody>
                <Button
                  color="dark"
                  block
                  onClick={() => {
                    toggleItemName("item_name");
                  }}
                >
                  Item Name
                </Button>
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={() => {
                    toggleASL("asl_photo");
                  }}
                >
                  Sign Language Photo
                </Button>

                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  onClick={() => {
                    toggleAudio("item_audio");
                  }}
                >
                  Item Audio
                </Button>

                {/************************ SECONDARY: IMAGE MODAL********************* */}
                <Modal isOpen={nestedItemName} toggle={toggleItemName}>
                  {/* header */}
                  <ModalHeader>ITEM NAME</ModalHeader>
                  <ModalBody>
                    <Card>
                      <Input
                        type="text"
                        id="item_name"
                        name="item_name"
                        placeholder="Item Name"
                        className="mb-3"
                        onChange={handleChangeItemName}
                      />
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggleItemName}>
                      Done
                    </Button>
                  </ModalFooter>
                </Modal>

                {/************************ SECONDARY: IMAGE MODAL********************* */}
                <Modal isOpen={nestedASL} toggle={toggleASL}>
                  {/* header */}
                  <ModalHeader>ASL</ModalHeader>
                  <ModalBody>
                    <Card>
                      <h3>AMERICAN SIGN LANGUAGE</h3>
                      <Input
                        name="file"
                        id="file"
                        type="file"
                        onChange={handleChangeFile}
                      />
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggleASL}>
                      Done
                    </Button>
                  </ModalFooter>
                </Modal>

                {/************************ SECONDARY: IMAGE MODAL********************* */}
                <Modal isOpen={nestedAudio} toggle={toggleAudio}>
                  {/* header */}
                  <ModalHeader>RECORDING</ModalHeader>
                  <ModalBody>
                    <Card>
                      <h3>ITEM AUDIO</h3>
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
                  block
                  color="success"
                  style={{ marginTop: "2rem" }}
                  type="submit"
                  onSubmit={handleOnSubmit}
                >
                  SUBMIT
                </Button>
              </ModalBody>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SearchMenu;
