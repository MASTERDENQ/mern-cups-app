import React from "react";
// import "../css/viewEditItem.css";

let EditModal = props => {
  return (
    <div id="modal-background">
      <div id="edit-modal-body">
        <p id="modal-title" class="modal-font">
          Update Item
        </p>
        <p id="modal-message" class="modal-font">
          Enter the new values for the respective fields:
        </p>
        <div id="modal-textfield">
          <input
            id="modal-textfield-cost"
            type="text"
            min="0"
            placeholder="Cost"
          />
          <input
            id="modal-textfield-quantity"
            type="text"
            min="0"
            placeholder="Quantity"
          />
        </div>

        <div id="modal-button-container">
          <div
            class="modal-button modal-button-edit"
            onClick={() => {
              props.editItem(
                document.getElementById("modal-textfield-cost").value,
                document.getElementById("modal-textfield-quantity").value
              );
              props.closeModal();
            }}
          >
            <p class="modal-font">Submit Update</p>
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

export default EditModal;
