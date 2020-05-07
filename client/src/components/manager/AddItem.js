import React, { useState } from "react";
import axios from "axios";
import ASL from "../../assets/asl.jpg";
import Photo from "../../assets/image.jpeg";
import Audio from "../../assets/audio.png";
import Icon from "../../assets/icon.png";
import "../../css/AddItemStyle.css";
import {
  Container,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardImg,
  Form,
  Alert,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const AddItem = (props) => {
  /**************** COMPONENT STATES ******************** */

  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [cost, setCost] = useState("");
  const [item_image, setItemImage] = useState("");
  const [sign_language, setSignLanguage] = useState("");
  const [item_audio, setItemAudio] = useState("");
  const [msg, setMsg] = useState("Fill out all available fields.");
  const [error, setError] = useState("");

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => setItemName(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeStock = (e) => setStock(e.target.value);
  const handleChangeCost = (e) => setCost(e.target.value);

  const handleChangeItemImage = (e) => {
    // Check if file extention is correct.
    if (checkMimeImageType(e)) {
      setItemImage(e.target.files[0]);
    }
  };

  const handleChangeSignLanguage = (e) => {
    // Check if file extention is correct.
    if (checkMimeImageType(e)) {
      setSignLanguage(e.target.files[0]);
    }
  };

  const handleChangeItemAudio = (e) => {
    if (checkMimeAudioType(e)) {
      setItemAudio(e.target.files[0]);
    }
  };

  /**************** EXTENSION VALIDATION ******************** */
  const checkMimeImageType = (event) => {
    //getting file object
    let file = event.target.files[0];

    //define message container
    let err = "";

    // list allow mime type
    const types = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

    // compare file type find doesn't match
    if (types.every((type) => file.type !== type)) {
      // create error message and assign to container
      err +=
        file.type +
        " is not supported. Supported Image Formats: ---png---jpg--jpeg---gif---";
    }

    // if message not same old that mean has error
    if (err !== "") {
      setError(err);
      // discard selected file
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  };

  const checkMimeAudioType = (event) => {
    //getting file object
    let file = event.target.files[0];

    //define message container
    let err = "";

    // list allow mime type
    const types = ["audio/wav", "audio/mpeg", "audio/ogg"];

    // compare file type find doesn't match
    if (types.every((type) => file.type !== type)) {
      // create error message and assign to container
      err +=
        file.type +
        " is not supported. Supported Image Formats: ---WAV---MP3---OGG---";
    }

    // if message not same old that mean has error
    if (err !== "") {
      setError(err);
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

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
      setError(`Sorry you have missing requirement(s).
       You have the following fields missing:
       ${item_name ? "" : "|---Item Name---"}\n
       ${category ? "" : "|---Category---"}\n
       ${stock ? "" : "|---Stock---"}\n
       ${cost ? "" : "|---Cost---"}\n
       ${item_image ? "" : "|---Upload Photo---"}\n
       ${sign_language ? "" : "|---Upload ASL---"}\n
       ${item_audio ? "" : "|---Audio---|"}.`);
    } else {
      // Request body
      const formData = new FormData();
      formData.append("item_name", item_name.toString().toLowerCase());
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("cost", cost);
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
          setError(null);
          setMsg("New menu item was successfully added.");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setError(err.response.data);
        });
    }
  };

  const pass = props.loggedInStatus;

  /******************************* RENDER ******************************* */
  if (pass === "NOT_LOGGED_IN") {
    return (
      <div>
        <h1>
          YOU ARE NOT LOGGED IN. PLEASE <Link to="/">LOGIN</Link>
        </h1>
      </div>
    );
  } else {
    return (
      <Container>
        <div
          style={{
            display: "block",
          }}
        >
          {/* Title */}
          <h1>
            <Alert color="dark">ADD MENU ITEM</Alert>
          </h1>

          <Row>
            <Col>
              <Link to="/chart">
                <Button className="mt-4 mb-3" color="dark" block>
                  VIEW CHARTS
                </Button>
              </Link>
            </Col>
            <Col>
              <Link to="/list">
                <Button className="mt-4 mb-3" color="dark" block>
                  VIEW/EDIT ITEMS
                </Button>
              </Link>
            </Col>
          </Row>

          {/* Error display */}
          {error ? (
            <Alert color="danger">{error}</Alert>
          ) : (
            <Alert color="success">{msg}</Alert>
          )}

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

                {/* Selection of category */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Category</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    onChange={handleChangeCategory}
                  >
                    <option></option>
                    <option>Beverage</option>
                    <option>Snack</option>
                    <option>Daily Surprise</option>
                  </Input>
                </InputGroup>
                <hr />
              </Container>

              {/* Selection of Photo */}
              <Row>
                <Col sm="3">
                  <Card body inverse color="dark">
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
                <Col> </Col>

                {/* ASL Selection */}
                <Col className="left" sm="3">
                  <Card body inverse color="dark">
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
                <Col> </Col>

                {/* Audio Recording */}
                <Col sm="3">
                  <Card
                    body
                    inverse
                    color="dark"
                    // className="ml-2 mr-4"
                    style={{ alignItems: "left" }}
                  >
                    <h3>Audio</h3>
                    <CardImg src={Audio} alt={Icon} />
                    <Input
                      id="item_audio"
                      name="item_audio"
                      type="file"
                      onChange={handleChangeItemAudio}
                    />
                  </Card>
                </Col>
              </Row>

              <Button
                color="success"
                type="submit"
                style={{ marginTop: "1rem" }}
                block
              >
                <h5>ADD ITEM</h5>
              </Button>
            </Form>
          </div>
        </div>

        <Link to="/control">
          <Button className="mt-2 mb-3" color="dark" block>
            MANAGER CONTROL CENTER
          </Button>
        </Link>
      </Container>
    );
  }
};

export default AddItem;
