import React from 'react';
import '../css/AddItemStyle.css';

import Photo from '../assets/photo.png';
import ASL from '../assets/asl.jpg';
import Audio from '../assets/audio.png';


const AddItem = () => 
<div className="MainDiv">
        <div className="title">
            <h1>Add Item</h1>
        </div>

        <div>
            <form className="AddItemForm">
            <div>
                <fieldset>
                    
                    <label>Item Name</label> <input id="item" type="text" placeholder="Item Name"/>

                    
                    <select id="category">
                        <option hidden   >Category</option>
                        <option defaultChecked value="1">Beverage</option>
                        <option value="2">Snack</option>
                        <option value="3">Daily Surprise</option>
                    </select>

                    <span>&nbsp;&nbsp;</span>
                    <span>&nbsp;&nbsp;</span>

                    
                    <label>Stock Quantity</label> <input type="number" id="stock" min="0"/>

                    <span>&nbsp;&nbsp;</span>
                    <span>&nbsp;&nbsp;</span>

                   
                    <label>Cost</label> <input type="text" id="cost" min="0"/>
                </fieldset>
            </div>

            <div className="threePiece" > 
            <fieldset>
                {/* <div class="card">
                    <img src={Photo} alt="Photo" />
                    <div class="container">
                        <h4><b>Add Images</b></h4> 
                    </div>
                </div>

                <div class="card">
                    <img src={ASL} alt="American Sing Language" />
                    <div class="container">
                        <h4><b>Add ASL</b></h4> 
                    </div>
                </div> 

                    <div class="card">
                        <img src={Audio} alt="Audio" />
                        <div class="container">
                            <h4><b>Add Audio</b></h4> 
                        </div>
                    </div> */}
            
            
                <label>Photo</label><input id="ItemImageInput" type="file" ></input>

                <label>ASL</label><input id="ItemSignatureImageInput" type="file" ></input>

                <label>Audio</label><input id="ItemAudioInput" type="file" ></input>
                    
            </fieldset>
            </div>
        
        <div className="card">
            <h4>ADD ITEM</h4>
        </div>
    </form>
    </div>

</div>


export default AddItem;

