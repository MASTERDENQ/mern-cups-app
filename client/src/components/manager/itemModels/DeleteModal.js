import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

const DeleteModal = (props) => {
  /**************** COMPONENT STATES ******************** */
  const [modal, setModal] = useState(false);

  /**************** MODAL TOGGLERS ******************** */
  const toggle = () => {
    console.log(props.id, "File ID");
    setModal(!modal);
  };

  const deleteItem = () => {
    console.log(`Delete Request for Item ${props.id}`);
    axios
      .post(`/delete_menu_item/${props.id}`)
      .then((res) => {
        console.log(res);
        console.log("RESULTS DATA: ", res.data);
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ msg: err.response.data });
      });
  };
  return (
    <div>
      <Link to="#" onClick={toggle} style={{ color: "white" }}>
        &times;
      </Link>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>DELETE MENU ITEM</ModalHeader>
        <ModalBody>Are you sure you want to delete this item.</ModalBody>

        <ModalBody>
          <Button
            color="dark"
            block
            onClick={() => {
              toggle();
              deleteItem();
            }}
          >
            YES
          </Button>
          <Button
            color="dark"
            style={{ marginTop: "2rem" }}
            block
            onClick={() => {
              toggle();
            }}
          >
            NO
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DeleteModal;
