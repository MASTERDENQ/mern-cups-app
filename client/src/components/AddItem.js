import React, { Component } from "react";
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
  Col
} from "reactstrap";
import { Link } from "react-router-dom";

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AddItem extends Component {
  /**************** COMPONENT STATES ******************** */

  state = {
    item_name: null,
    category: null,
    stock: null,
    cost: null,
    item_image: null,
    sign_language: null,
    item_audio: null,
    isRecording: false,
    isBlocked: false
  };

  /**************** STATE HANDLERS ******************** */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeImage = event => {
    console.log(event.target.files[0]);

    this.setState({
      item_image: event.target.files[0]
    });
  };

  onChangeASL = event => {
    console.log(event.target.files[0]);

    this.setState({
      sign_language: event.target.files[0]
    });
  };

  // onChangeAudio = event => {
  //   console.log(event.target.files[0]);
  //   this.setState({
  //     item_audio: event.target.files[0],
  //     loaded: 0
  //   });
  // };
  /**************** FORM SUBMISSION ******************** */

  onSubmit = e => {
    // Prevent Default
    e.preventDefault();

    // Log state to console
    console.log(this.state);

    // Headers
    // const config = {
    //   headers: {
    //     "Content-Type":
    //       "multipart/form-data; boundary=AaB03x" +
    //       "--AaB03x" +
    //       "Content-Disposition: file" +
    //       "Content-Type: png" +
    //       "Content-Transfer-Encoding: binary" +
    //       "...data... " +
    //       "--AaB03x--",
    //     Accept: "application/json",
    //     type: "formData"
    //   }
    // };

    const image = new FormData();
    image.append(
      "item_image",
      this.state.item_image,
      this.state.item_image.name
    );

    const asl = new FormData();
    asl.append(
      "sign_language",
      this.state.sign_language,
      this.state.sign_language.name
    );

    // const audio = new FormData();
    // audio.append(
    //   "item_audio",
    //   this.state.item_audio,
    //   this.state.item_audio.name
    // );

    const menuItemUpload = {
      item_name: this.state.item_name,
      category: this.state.category,
      stock: this.state.category,
      cost: this.state.cost,
      item_image: image,
      sign_language: asl,
      item_audio: this.state.item_audio
    };

    /**************** REQUEST SUBMISSION ******************** */
    // Make POST Request to add Item to database
    axios
      .post("/testdb/add_menu_item", menuItemUpload)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
      });
  };

  /**************** AUDIO RECORDING ******************** */

  // Start the recording of audio
  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch(e => console.error(e));
    }
  };

  // Stop the recording of audio
  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const item_audio = URL.createObjectURL(blob);
        this.setState({ item_audio, isRecording: false });
      })
      .catch(e => console.log(e));
  };

  /**************** MIC PERMISSION CHECK ******************** */
  // React-Mic
  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }

  /******************************* RENDER ******************************* */
  render() {
    return (
      <Container>
        <div className="MainDiv">
          {/* Title */}
          <div className="title">
            <h1>Add Item</h1>
          </div>

          {/* Form */}
          <div>
            <Form
              className="AddItemForm"
              onSubmit={this.onSubmit}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
                  />
                  <InputGroupAddon addonType="append">.00</InputGroupAddon>
                </InputGroup>
                <br />
                <br />

                {/* Selection of category */}
                <Label>Category</Label>
                <select name="category" onChange={this.onChange}>
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
                      onChange={this.onChangeImage}
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
                      onChange={this.onChangeASL}
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
                        onClick={this.start}
                        disabled={this.state.isRecording}
                        type="button"
                      >
                        Record
                      </Button>

                      <Button
                        onClick={this.stop}
                        disabled={!this.state.isRecording}
                        type="button"
                        // onChange={this.onChangeAudio}
                      >
                        Stop
                      </Button>
                      <audio
                        name="item_audio"
                        src={this.state.item_audio}
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
  }
}

export default AddItem;
