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
} from "reactstrap";
import { Link } from "react-router-dom";

const ViewFile = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [modal, setModal] = useState(false);
  const [nestedImage, setNestedImage] = useState(false);
  const [nestedASL, setNestedASL] = useState(false);
  const [nestedAudio, setNestedAudio] = useState(false);
  const [file, setFile] = useState("");
  const [Url, setUrl] = useState("");
  const [msg, setMsg] = useState(null);

  /**************** MODAL TOGGLERS ******************** */
  // Main Toggle
  const toggle = () => {
    console.log(props.id, "File ID");
    setModal(!modal);
  };

  // Secondary Toggle
  const toggleImage = () => {
    setNestedImage(!nestedImage);
  };

  // Secondary Toggle
  const toggleASL = () => {
    setNestedASL(!nestedASL);
  };

  // Secondary Toggle
  const toggleAudio = () => {
    setNestedAudio(!nestedAudio);
  };

  /**************** FORM SUBMISSION ******************** */
  const onSubmit = (field) => {
    // Making Request
    axios
      .get(`/menu_item/${props.id}/${field}`)
      .then((res) => {
        console.log(res);
        setFile(res);
        setUrl(`http://localhost:5000/menu_item/${props.id}/${field}`);
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
  };

  return (
    <div>
      <Link to="#" onClick={toggle}>
        VIEW FILES
      </Link>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>MENU ITEM FILES</ModalHeader>
        <ModalBody>Click one to view</ModalBody>

        <ModalBody>
          <Button
            color="dark"
            block
            onClick={() => {
              toggleImage();
              onSubmit("item_photo");
            }}
          >
            Item Photo
          </Button>
          <Button
            color="dark"
            style={{ marginTop: "2rem" }}
            block
            onClick={() => {
              toggleASL();
              onSubmit("asl_photo");
            }}
          >
            Sign Language Photo
          </Button>

          <Button
            color="dark"
            style={{ marginTop: "2rem" }}
            block
            onClick={() => {
              toggleAudio();
              onSubmit("item_audio");
            }}
          >
            Item Audio
          </Button>
        </ModalBody>
      </Modal>

      {/************************ SECONDARY: IMAGE MODAL********************* */}
      <Modal isOpen={nestedImage} toggle={toggleImage}>
        {/* header */}
        <ModalHeader>Image</ModalHeader>
        <ModalBody>
          <Card>
            <h3>ITEM PHOTO</h3>
            <CardImg src={Url} alt={"Error"} height="50%" />
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleImage}>
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
            <CardImg src={Url} alt={"Error"} height="50%" />
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
            <audio src={Url} alt={"Error"} height="50%" controls="controls" />
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleAudio}>
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewFile;
