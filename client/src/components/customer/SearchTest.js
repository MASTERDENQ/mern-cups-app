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
  Container,
} from "reactstrap";

const SearchTest = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [item_name, setItemName] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => {
    setType(e.target.name);
    setItemName(e.target.value);
    console.log(e.target.name);
  };

  const handleChangeFile = (e) => {
    setType(e.target.name);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  /**************** FORM SUBMISSION ******************** */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("1");
    // Check for empty fields
    if (!item_name || !file) {
      setMsg("Sorry you have missing requirement. Please select one.");
    } else {
      const formData = new FormData();
      formData.append("item_name", item_name);
      formData.append("file", file);

      // Making Request
      fetch({
        method: "GET",
        url: `/search_items/${type}`,
        encType: "multipart/form-data",
        data: formData,
      })
        .then((res) => {
          console.log(res);
          setMsg("LOADED_SUCCESSFULLY");
          console.log(res.data);
          console.log("2");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setMsg(err.response.data);
          console.log("3");
        });
    }
  };

  return (
    <Container>
      {/************************ PRIMARY: IMAGE MODAL********************* */}
      Serch by item name, asl or audio file
      {/* Error display */}
      {msg ? <Alert color="danger">{msg}</Alert> : null}
      <form
        // method="GET"
        // url="/search_item/item_name"
        // encType="multipart/form-data"
        onSubmit={handleOnSubmit}
      >
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

        <Card>
          <h3>AMERICAN SIGN LANGUAGE</h3>
          <Input
            name="file"
            id="file"
            type="file"
            onChange={handleChangeFile}
          />
        </Card>
        <Card>
          <h3>ITEM AUDIO</h3>
          <Input
            name="file"
            id="file"
            type="file"
            onChange={handleChangeFile}
          />
        </Card>

        <Button
          block
          color="success"
          style={{ marginTop: "2rem" }}
          type="submit"
          onSubmit={handleOnSubmit}
        >
          SUBMIT
        </Button>
      </form>
    </Container>
  );
};

export default SearchTest;
