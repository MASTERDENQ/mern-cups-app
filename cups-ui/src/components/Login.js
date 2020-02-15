import React from 'react'
import logo from '../assets/avatar.jpg';

const Login = () => <div>
    <img src={logo} className="Avatar" alt="Avatar" />
    <br/><br/>

    <label id="Title">Login</label>

    <form className="LoginForm">
    <input id="EmailInput" type="email" placeholder="Email Address"></input>
    <input id="PasswordInput" type="password" placeholder="Password"></input>
    <input id="SignatureImageInput" type="file" placeholder="SignatureImage"></input>
    <input id="AudioInput" placeholder="Audio Input"></input>
    
    <button>Login</button>
    <button>Create an Account</button>
    </form>
</div>

export default Login