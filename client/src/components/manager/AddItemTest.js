import React from "react";
import "../../css/AddItemStyle.css";

const AddItemTest = () => {
  return (
    <div>
      <form action="/add_menu_item" method="POST" encType="multipart/form-data">
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
        <input name="item_image" id="item_image" type="file" accept="image/*" />
        <input name="sign_language" id="item_image" type="file" />
        <input name="item_audio" id="item_audio" type="file" />
        <audio controls>
          <source
            src={document.getElementById("item_audio")}
            type="audio/mpeg"
          />
        </audio>
        <input
          type="submit"
          value="Add Item"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default AddItemTest;
