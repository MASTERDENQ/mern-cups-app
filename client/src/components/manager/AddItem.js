import React, { useState, useEffect } from "react";
import axios from "axios";
import ASL from "../../assets/asl.jpg";
import Photo from "../../assets/image.jpeg";
import Audio from "../../assets/audio.png";
import Icon from "../../assets/icon.png";
import "../../css/AddItemStyle.css";
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

const AddItem = (props) => {
  /**************** COMPONENT STATES ******************** */

  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [cost, setCost] = useState("");
  const [item_image, setItemImage] = useState("");
  const [sign_language, setSignLanguage] = useState("");
  const [item_audio, setItemAudio] = useState("");
  const [Url, setUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [msg, setMsg] = useState(null);
  const [files, setFiles] = useState([]);

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => setItemName(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangeCost = (e) => setCost(e.target.value);
  const handleChangeItemImage = (e) => setItemImage(e.target.files[0]);
  const handleChangeSignLanguage = (e) => setSignLanguage(e.target.files[0]);
  const handleChangeItemAudio = (e) => setItemAudio(e.target.files[0]);

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
      setFiles([{ item_image }, { sign_language }, { item_audio }]);
      console.log(files);

      // Request body
      const formData = new FormData();
      formData.append("item_name", item_name);
      formData.append("category", category);
      formData.append("stock", stock);

      // formData.append("files[]", files);

      // formData.append("file[item_image]", item_image);
      // formData.append("file[sign_language]", sign_language);
      // formData.append("file[item_audio]", item_audio);

      formData.append("item_image", item_image);
      formData.append("sign_language", sign_language);
      formData.append("item_audio", item_audio);

      /**************** REQUEST SUBMISSION ******************** */
      // Make POST Request to add Item to database
      axios({
        method: "POST",
        url: "/add_menu_item",
        encType: "multipart/form-data",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
          setMsg(error.response.data);
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
        const data = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const fileLink = URL.createObjectURL(blob);
        setUrl(fileLink);
        setItemAudio(data);
        setIsRecording(false);
        console.log(item_audio);
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

  const pass = props.loggedInStatus;

  /******************************* RENDER ******************************* */
  if (pass === "NOT_ LOGGED_IN") {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          YOU ARE NOT LOGGED IN. PLEASE <Link to="/">LOGIN</Link>
        </h1>
      </div>
    );
  } else {
    return (
      <Container>
        <div
          className="MainDiv"
          style={{
            // overflow: "auto",
            // height: "inherit",
            display: "block",
          }}
        >
          {/* Title */}
          <div className="title">
            <h1>Add Item</h1>
          </div>
          {/* Error display */}
          {msg ? <Alert color="danger">{msg}</Alert> : null}

          {/* Form */}
          <div>
            <Form onSubmit={handleOnSubmit}>
              <Container>
                {/* Add New Item */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Item Name</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="item_name"
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
                    id="stock"
                    name="stock"
                    type="number"
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
                    id="cost"
                    name="cost"
                    type="text"
                    onChange={handleChangeCost}
                  />
                  <InputGroupAddon addonType="append">.00</InputGroupAddon>
                </InputGroup>
                <br />
                <br />

                {/* Selection of category */}
                <Label>Category</Label>
                <select
                  id="category"
                  name="category"
                  onChange={handleChangeCategory}
                >
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
                      id="item_image"
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
                      id="sign_language"
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
                    <Input
                      id="item_audio"
                      name="item_audio"
                      type="file"
                      onChange={handleChangeItemAudio}
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
                      <audio name="item_audio" src={Url} controls="controls" />
                    </div>
                  </Card>
                </Col>
              </Row>

              <Button
                color="dark"
                type="submit"
                style={{ marginTop: "2rem" }}
                block
              >
                <h4>ADD ITEM</h4>
              </Button>

              <Link to="/list">
                <Button
                  color="primary"
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
  }
};

export default AddItem;
