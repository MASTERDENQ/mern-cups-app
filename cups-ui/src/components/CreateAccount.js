import React from 'react'
import '../css/CreateAccountStyle.css'
import avatar from '../assets/avatar.jpg';


const Login = () => <div className="MainDiv">

    <label id="Title">Create an Account</label>

    <form className="CreateAccountForm">
        <input id="EmailInput" type="email" placeholder="Email Address"></input>
        <input id="ConfirmEmailInput" type="email" placeholder="Confirm Email Address"></input>
        <input id="PasswordInput" type="password" placeholder="Password"></input>
        <input id="ConfirmPasswordInput" type="password" placeholder="Confirm Password"></input>
        <input id="SignatureImageInput" type="file" placeholder="SignatureImage"></input>
        <input id="AudioInput" type="file" placeholder="Audio Input"></input>

        <button>Create Account</button>
    </form>
</div>

export default Login

