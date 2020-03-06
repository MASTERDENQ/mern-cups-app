import React, { Component } from 'react'
import axios from 'axios'

class AddItemNew extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             item: '',
             category: '',
             stock: '',
             cost: ''
        }
    }

    changHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e  ) => {
          e.preventDefault()
          console.log(this.state)
          axios
            .post('https://jsonplaceholder.typicode.com/posts', this.state)
            .then(response =>{console.log(response)})
            .catch(error => {console.log(error)})
    }
    

    render() {
        const {item, category, stock, cost} = this.state

        return (
            <div className="MainDiv">
                <div className="title">
                    <h1>Add Item</h1>
                </div>

                <div>
                    <form className="AddItemForm" onSubmit={this.submitHandler}>
                    <div>
                        <fieldset>

                            {/* Add New Item */}
                            <label>Item Name</label> 
                            <input 
                                name="item" 
                                value={item} 
                                type="text" 
                                placeholder="Item Name" 
                                onChange={this.changHandler}
                            />

                            {/* Selection of category */}
                            <select name="category" value={category} onChange={this.changHandler}>
                                <option hidden   >Category</option>
                                <option defaultChecked value="1">Beverage</option>
                                <option value="2">Snack</option>
                                <option value="3">Daily Surprise</option>
                            </select>

                            <span>&nbsp;&nbsp;</span>
                            <span>&nbsp;&nbsp;</span>

                            {/* Enter stock quantity */}
                            <label>Stock Quantity</label> 
                            <input 
                                name="stock" 
                                value={stock} 
                                type="number" 
                                //min="0"
                                onChange={this.changHandler}
                            />

                            <span>&nbsp;&nbsp;</span>
                            <span>&nbsp;&nbsp;</span>

                             {/* Enter cost of item each */}
                            <label>Cost</label> 
                            <input 
                                name="cost" 
                                value={cost} 
                                type="money" 
                                //min="0"
                                onChange={this.changHandler}
                                />
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
                    
                    
                        <label>Photo</label><input id="ItemImageInput" type="file" />

                        <label>ASL</label><input id="ItemSignatureImageInput" type="file" />

                        <label>Audio</label><input id="ItemAudioInput" type="file" />
                            
                    </fieldset>
                    </div>
                
                <button className="card" type="submit">
                    <h4>ADD ITEM</h4>
                </button>
            </form>
            </div>
        </div>
        )
    }
}

export default AddItemNew
