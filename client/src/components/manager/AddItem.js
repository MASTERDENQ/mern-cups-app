import React, { useState, useEffect } from "react";
import axios from "axios";
import ASL from "../assets/asl.jpg";
import Photo from "../assets/image.jpeg";
import Audio from "../assets/audio.png";
import Icon from "../assets/icon.png";
import "../css/AddItemStyle.css";
import MicRecorder from "mic-recorder-to-mp3";
import {
  Container,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardImg,
  Form,
  Alert,
  // DropdownItem,
  // Dropdown,
  // UncontrolledDropdown,
  // DropdownMenu,
  // DropdownToggle,
  // CardText,
  // CardBody,
  // CardTitle,
  // CardSubtitle,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AddItem = () => {
  /**************** COMPONENT STATES ******************** */

  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [cost, setCost] = useState("");
  const [item_image, setItem_Image] = useState("");
  const [sign_language, setSignLanguage] = useState("");
  const [item_audio, setItemAudio] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [msg, setMsg] = useState(null);

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => setItemName(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangeCost = (e) => setCost(e.target.value);
  const handleChangeItemImage = (e) => {
    setItem_Image(e.target.files[0]);
    console.log(item_image);
  };
  const handleChangeSignLanguage = (e) => setSignLanguage(e.target.files[0]);
  // const handleChangeItemAudio = e => setItemAudio(e.target.value);

  /**************** FORM SUBMISSION ******************** */

  const handleOnSubmit = (e) => {
    // Prevent Default
    e.preventDefault();

    if (
      !item_name ||
      !category ||
      !stock ||
      !cost ||
      !item_image ||
      !sign_language ||
      !item_audio
    ) {
      setMsg("Sorry you have missing require(s). Check again.");
    } else {
      const body = {
        item_name,
        category,
        stock,
        cost,
        item_image,
        sign_language,
        item_audio,
      };

      /**************** REQUEST SUBMISSION ******************** */
      // Make POST Request to add Item to database
      axios({
        method: "POST",
        url: "/add_menu_item",
        encType: "multipart/form-data",
        data: body,
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          setMsg(error.response.status);
        });
    }
  };

  /**************** AUDIO RECORDING ******************** */

  // Start the recording of audio
  const start = () => {
    if (isBlocked) {
      console.log("Add Item Permission Denied");
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
        const item_audio = URL.createObjectURL(blob);
        setItemAudio(item_audio);
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  /**************** MIC PERMISSION CHECK ******************** */
  // React-Mic
  useEffect(() => {
    // React-Mic Permissions Check
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("\nAdd Item Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("\nAdd Item Permission Denied");
        setIsBlocked(false);
      }
    );
  }, []);

  /******************************* RENDER ******************************* */
  return (
    <Container>
      <div className="MainDiv">
        {/* Title */}
        <div className="title">
          <h1>Add Item</h1>
        </div>
        {/* Error display */}
        {msg ? <Alert color="danger">{msg}</Alert> : null}

        {/* Form */}
        <div>
          <Form
            className="AddItemForm"
            method="POST"
            action="/testdb/add_menu_item"
            encType="multipart/form-data"
          >
            <Container>
              {/* Add New Item */}
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Item Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  name="item_name"
                  type="text"
                  placeholder="Item Name"
                  onChange={handleChangeItemName}
                />
              </InputGroup>

              {/* Enter stock quantity */}

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Stock Quantity</InputGroupText>
                </InputGroupAddon>
                <Input
                  name="stock"
                  type="number"
                  min="0"
                  onChange={handleChangeStock}
                />
              </InputGroup>

              {/* Enter cost of item each */}
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Cost</InputGroupText>
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <Input
                  name="cost"
                  type="text"
                  min="0"
                  onChange={handleChangeCost}
                />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>
              <br />
              <br />

              {/* Selection of category */}
              <Label>Category</Label>
              <select name="category" onChange={handleChangeCategory}>
                <option hidden>Category</option>
                <option defaultChecked>Beverage</option>
                <option>Snack</option>
                <option>Daily Surprise</option>
              </select>
              <br />
              <br />
            </Container>

            {/* Selection of Photo */}
            <Row>
              <Col sm="4">
                <Card>
                  <h3>Upload Photo</h3>
                  <CardImg src={Photo} alt={Icon} />
                  <Input
                    name="item_image"
                    type="file"
                    onChange={handleChangeItemImage}
                  />
                </Card>
              </Col>

              {/* ASL Selection */}
              <Col sm="4">
                <Card>
                  <h3>Upload ASL</h3>
                  <CardImg src={ASL} alt={Icon} />
                  <Input
                    name="sign_language"
                    type="file"
                    onChange={handleChangeSignLanguage}
                  />
                </Card>
              </Col>

              {/* Audio Recording */}
              <Col sm="4">
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
                      name="item_audio"
                      src={item_audio}
                      controls="controls"
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Button
              color="dark"
              type="submit"
              style={{ marginTop: "2rem" }}
              block
              onClick={handleOnSubmit}
            >
              <h4>ADD ITEM</h4>
            </Button>

            <Link to="/list">
              <Button
                color="dark"
                type="button"
                style={{ marginTop: "2rem" }}
                block
              >
                <h4>VIEW ITEMS</h4>
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default AddItem;
