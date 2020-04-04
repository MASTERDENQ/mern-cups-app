import React, { useState, useEffect } from "react";
// import ASL from "../assets/asl.jpg";
// import Photo from "../assets/image.jpeg";
import Audio from "../assets/audio.png";
import Icon from "../assets/icon.png";
import "../css/AddItemStyle.css";
import MicRecorder from "mic-recorder-to-mp3";
import {
  //   Container,
  //   Label,
  //   Input,
  Button,
  //   InputGroup,
  //   InputGroupAddon,
  //   InputGroupText,
  Card,
  CardImg,
  //   Form,
  //   Alert,
  // DropdownItem,
  // Dropdown,
  // UncontrolledDropdown,
  // DropdownMenu,
  // DropdownToggle,
  // CardText,
  // CardBody,
  // CardTitle,
  // CardSubtitle,
  //   Row,
  Col,
} from "reactstrap";
// import { Link } from "react-router-dom";

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AddItemTest = () => {
  const [item_audio, setItemAudio] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

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

  return (
    <div>
      <form
        action="/testdb/add_menu_item"
        method="POST"
        encType="multipart/form-data"
        href="#"
      >
        <input
          type="text"
          name="item_name"
          id="item_name"
          placeholder="Item Name"
        />

        <input type="text" name="stock" id="stock" placeholder="Stock" />

        <input type="text" name="cost" id="cost" placeholder="Cost" />

        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
        />

        <input name="item_image" id="item_image" type="file" />

        <input name="sign_language" id="item_image" type="file" />

        <input name="item_audio" id="item_audio" type="file" />

        {/* Audio Recording */}
        {/* <Col sm="4">
          <Card>
            <h3>Audio</h3>
            <CardImg src={Audio} alt={Icon} height="50%" />

            <div className="audio-css">
              <Button onClick={start} disabled={isRecording} type="button">
                Record
              </Button>

              <Button onClick={stop} disabled={!isRecording} type="button">
                Stop
              </Button>
              <audio name="item_audio" src={item_audio} controls="controls" />
            </div>
          </Card>
        </Col> */}

        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default AddItemTest;
