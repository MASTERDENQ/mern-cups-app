import React, { Component } from 'react'
import axios from 'axios'
import ASL from '../assets/asl.jpg'
import Photo from '../assets/photo.png';
import '../css/AddItemStyle.css';

import MicRecorder from 'mic-recorder-to-mp3';
import '../css/ReactMicStyle.css'

// Create a new record
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class AddItemNew extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             item: '',
             category: '',
             stock: '',
             cost: '',
             image: '',
             asl_image: '',
             audio: '',

             isRecording: false,
             isBlocked: false,
             
             
        }
    }


    // Handles the assignment of details about new item
    changHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    // Handle the submission of new item to database
    submitHandler = (e) => {
          e.preventDefault()

          // Log state to console
          console.log(this.state)

          axios
            .post('https://jsonplaceholder.typicode.com/posts', this.state)
            .then(response =>{console.log(response)})
            .catch(error => {console.log(error)})
    }
    
    // 
    start = () => {
        if (this.state.isBlocked) {
        console.log('Permission Denied');
        } 
        else {
        Mp3Recorder
            .start()
            .then(() => {this.setState({ isRecording: true });})
            .catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
            const audio = URL.createObjectURL(blob)
            this.setState({ audio, isRecording: false });})
        .catch((e) => console.log(e));

        
    };

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
        () => {
            console.log('Permission Granted');
            this.setState({ isBlocked: false });
        },
        () => {
            console.log('Permission Denied');
            this.setState({ isBlocked: true })
        },
        );
    }


    render() {
        const {item, category, stock, cost, image, asl_image, audio} = this.state

        return (
            <div className="MainDiv">
                <div className="title"> 
                    <h1>Add Item</h1>
                </div>

                <div>
                    <form className="AddItemForm" onSubmit={this.submitHandler}>
                        <fieldset>
                        <label> ---- </label>

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

                            <label> ---- </label>

                            {/* Enter stock quantity */}
                            <label>Stock Quantity</label> 
                            <input 
                                name="stock" 
                                value={stock} 
                                type="number" 
                                min="0" 
                                onChange={this.changHandler} 
                            />

                            <label> ---- </label>

                             {/* Enter cost of item each */}
                            <label>Cost</label> 
                            <input 
                                name="cost" 
                                value={cost} 
                                type="money" 
                                min="0" 
                                onChange={this.changHandler} 
                            />

                            <label> ---- </label>
                        </fieldset>

                    <fieldset>
                        <button className="card" onClick={() => this.fileInput.click()} type="button">
                            <h3>Upload Photo</h3>
                            <img src={Photo} alt="" />
                            <input name="image" value={image} type="file" onChange={this.changHandler}
                                style={{display:'none'}}
                                ref={fileInput => this.fileInput = fileInput}
                            />
                        </button>

                        <button className="card" onClick={() => this.fileInput.click()} type="button">
                            <h3>Upload ASL</h3>
                            <img src={ASL} alt="American Sing Language" />
                            <input name="asl_image" value={asl_image} type="file" onChange={this.changHandler}
                                style={{display:'none'}}
                                ref={fileInput => this.fileInput = fileInput}
                            />
                        </button>
                        
                        <div className="audio">
                        <div className="card">
                            <h3>Audio</h3>
                            <div className="container">
                                <button 
                                    onClick={this.start} 
                                    disabled={this.state.isRecording}
                                    type="button"
                                >
                                    Record
                                </button>

                                <button 
                                    onClick={this.stop} 
                                    disabled={!this.state.isRecording}
                                    type="button"
                                >
                                    Stop
                                </button>
                                <audio name="audio" value={audio} src={this.state.audio} controls="controls" />
                            </div>
                        </div>    
                        </div> 
                    </fieldset>
                
                <button className="card" type="submit">
                    <h4>ADD ITEM</h4>
                </button>
            </form>
            </div>
        </div>
        )
    }
}
