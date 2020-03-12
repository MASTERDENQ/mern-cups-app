import React, { Component } from "react";
import axios from "axios";
import ASL from "../assets/asl.jpg";
import Photo from "../assets/image.jpeg";
import Audio from "../assets/audio.png";
import Icon from "../assets/icon.png";
import "../css/AddItemStyle.css";
import MicRecorder from "mic-recorder-to-mp3";
import uuid from "react-uuid";
import {
  Container,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  DropdownItem,
  Dropdown,
  Form,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AddItem extends Component {
  state = {
    name: "",
    category: "",
    stock: "",
    cost: "",
    image: "",
    asl_image: "",
    audio: "",

    isRecording: false,
    isBlocked: false
  };

  // Handles the assignment of details about new item
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* ****  Handle the submission of new item to database **** */

  onSubmit = e => {
    // Prevent Default
    e.preventDefault();

    // Log state to console
    console.log(this.state);

    // Make POST Request to add Item to database
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        const audio = URL.createObjectURL(blob);
        this.setState({ audio, isRecording: false });
      })
      .catch(e => console.log(e));
  };

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

  render() {
    return (
      <Container>
        <div className="MainDiv">
          <div className="title">
            <h1>Add Item</h1>
          </div>

          <div>
            <Form className="AddItemForm" onSubmit={this.onSubmit}>
              <Container>
                {/* Add New Item */}
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Item Name</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="name"
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

              <Row>
                <Col sm="4">
                  <Card>
                    <h3>Upload Photo</h3>
                    <CardImg src={Photo} alt={Icon} />
                    <Input name="image" type="file" onChange={this.onChange} />
                  </Card>
                </Col>

                <Col sm="4">
                  <Card>
                    <h3>Upload ASL</h3>
                    <CardImg src={ASL} alt={Icon} />
                    <Input
                      name="asl_image"
                      type="file"
                      onChange={this.onChange}
                    />
                  </Card>
                </Col>

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
                      >
                        Stop
                      </Button>
                      <audio
                        name="audio"
                        src={this.state.audio}
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
