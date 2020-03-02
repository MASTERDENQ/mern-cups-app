import React from 'react';
import '../css/AddItemStyle.css';

const AddItem = () => <div className="MainDiv">

    <label id="Title">Add Item</label>

    <form className="AddItemForm">

        <input id="ItemNameInput" type="text" placeholder="Item Name"></input>

        <select id="CategoryInput">
            <option hidden   >Category</option>
            <option value="1">CategoryOpt1</option>
            <option value="2">CategoryOpt2</option>
            <option value="3">CategoryOpt3</option>
        </select>

        <label>Quantity</label>

        <input type="number" min="0"></input>

        <input id="ItemIdInput" type="text" placeholder="Item ID"></input>

        <input id="ItemImageInput" type="file" ></input>

        <input id="ItemSignatureImageInput" type="file" ></input>
        
        <input id="ItemAudioInput" type="file" ></input>

        <button>Create Account</button>
    </form>
</div>


export default AddItem;