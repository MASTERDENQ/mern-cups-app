import React from 'react'
import '../css/LoginStyle.css';
import avatar from '../assets/avatar.jpg';


const Login = () => 
    <div className="MainDiv">
        
        <label id="Title">Login</label>

        <img src={avatar} className="Avatar" alt="Avatar" />

        <form className="LoginForm">
            
            <input id="EmailInput" type="email" placeholder="Email Address"></input>

            <input id="PasswordInput" type="password" placeholder="Password"></input>

            <input id="SignatureImageInput" type="file" placeholder="SignatureImage"></input>

            <input id="AudioInput" type="file" placeholder="Audio Input"></input>

            <br/>
            
            <button>Login</button>

        </form>
    </div>

export default Login