import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  // CardImg,
  Card,
  Form,
  Input,
  FormGroup,
  Alert,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";
import ViewFile from "../manager/itemModels/ViewFile";

const SearchMenu = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [modal, setModal] = useState(false);
  const [nestedItemName, setNestedItemName] = useState(false);
  const [nestedASL, setNestedASL] = useState(false);
  const [nestedAudio, setNestedAudio] = useState(false);
  const [item_name, setItemName] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState("Serch by item name, asl or audio file");
  const [type, setType] = useState(null);
  const [found, setFound] = useState(false);
  const [item, setItem] = useState([]);

  /**************** MODAL TOGGLERS ******************** */
  // Main Toggle
  const toggle = () => {
    setModal(!modal);
  };

  // Secondary Toggle
  const toggleItemName = () => {
    setNestedItemName(!nestedItemName);
  };

  // Secondary Toggle
  const toggleASL = () => {
    setNestedASL(!nestedASL);
  };

  // Secondary Toggle
  const toggleAudio = () => {
    setNestedAudio(!nestedAudio);
  };

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => {
    setType(e.target.name);
    setItemName(e.target.value);
  };

  const handleChangeFile = (e) => {
    setType(e.target.name);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  /**************** FORM SUBMISSION ******************** */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setItem(null);

    // Check for empty fields
    if (!item_name && !file) {
      setMsg("Sorry you have missing requirement. Please select one.");
    } else {
      const formData = new FormData();
      formData.append("item_name", item_name);
      formData.append("file", file);

      // Making Request
      axios({
        method: "POST",
        url: `/search_items/${type}`,
        encType: "multipart/form-data",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          setMsg("LOADED_SUCCESSFULLY");
          setItem(res.data);
          setFound(true);
          // Close modal
          toggle();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setMsg("ITEM NOT FOUND");
        });
    }
  };

  if (found) {
    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <SearchMenu />
        </div>
        <ListGroup>
          <ListGroupItem color="primary">
            <Row>
              <Col>
                <b>RESULTS::</b>
              </Col>
              <Col>NAME: {item.item_name}</Col>
              <Col>CATEGORY: {item.category}</Col>
              <Col>STOCK: {item.stock} </Col>
              <Col>COST: ${item.cost} </Col>
              {/* VIEW MENU ITEM FILES */}
              <Col>
                <Button className="remove-btn" color="primary" size="sm">
                  <ViewFile id={item._id} />
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={toggle} block color="primary">
          SEARCH
        </Button>

        {/************************ PRIMARY: IMAGE MODAL********************* */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>SEARCH FOR MENU ITEM</ModalHeader>
          <ModalBody>
            {/* Error display */}
            {msg === "ITEM NOT FOUND" ? (
              <Alert color="danger">{msg}</Alert>
            ) : (
              <Alert color="info">{msg}</Alert>
            )}
            <Form onSubmit={handleOnSubmit}>
              <FormGroup>
                <ModalBody>
                  <Button color="dark" block onClick={toggleItemName}>
                    Item Name
                  </Button>
                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                    onClick={toggleASL}
                  >
                    Sign Language Photo
                  </Button>

                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                    onClick={toggleAudio}
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
                          name="asl_photo"
                          id="asl_photo"
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
                          name="item_audio"
                          id="item_audio"
                          type="file"
                          onChange={handleChangeFile}
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
  }
};

export default SearchMenu;
