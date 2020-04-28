import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Form, Input, Alert, Container } from "reactstrap";

const SearchTest = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [item_name, setItemName] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  /**************** STATE HANDLERS ******************** */

  const handleChangeItemName = (e) => {
    setType(e.target.name);
    setItemName(e.target.value);
    console.log(e.target.name);
    console.log("nameHandler", type);
  };

  const handleChangeFile = (e) => {
    setType(e.target.name);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log("fileHandler", type);
  };

  /**************** FORM SUBMISSION ******************** */
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("submitHanderType", type);

    var formData = new FormData();
    formData.append("item_name", item_name);
    formData.append("file", file);
    console.log(item_name);

    // Making Request
    axios({
      method: "GET",
      url: `/search_items/${type}`,
      encType: "multipart/form-data",
      data: formData,
      header: {
        contentType: "multipart/form-data",
      },
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
        setMsg("LOADING_FAILED. NOT FOUND");
        console.log("3");
      });
  };

  return (
    <Container>
      {/************************ PRIMARY: IMAGE MODAL********************* */}
      Serch by item name, asl or audio file
      {/* Error display */}
      {msg ? <Alert color="danger">{msg}</Alert> : null}
      <Form onSubmit={handleOnSubmit}>
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
            name="asl_photo"
            id="asl_photo"
            type="file"
            onChange={handleChangeFile}
          />
        </Card>
        <Card>
          <h3>ITEM AUDIO</h3>
          <Input
            name="item_audio"
            id="item_audio"
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
      </Form>
    </Container>
  );
};

export default SearchTest;
