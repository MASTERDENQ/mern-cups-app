import React from "react";
// import "../css/viewEditItem.css";

let DeleteModal = props => {
  return (
    <div id="modal-background">
      <div id="delete-modal-body">
        <p id="modal-title" class="modal-font">
          Confirm Delete
        </p>
        <p id="modal-message" class="modal-font">
          Are you sure you wanna delete this item?
        </p>

        <div id="modal-button-container">
          <div
            class="modal-button modal-button-delete"
            onClick={() => {
              props.deleteItem();
              props.closeModal();
            }}
          >
            <p class="modal-font">Delete</p>
          </div>
          <div
            class="modal-button modal-button-cancel"
            onClick={() => props.closeModal()}
          >
            <p class="modal-font">Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
