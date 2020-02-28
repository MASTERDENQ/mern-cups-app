import React from 'react';
import '../css/NavBarStyle.css';
import avatar from '../assets/avatar.jpg'

const NavBar = () => {
    return (
        <div className="NavBar">
            <p className="Username">Username</p>
            <img src={avatar} className="NavBarAvatar" alt="Avatar" />
        </div>
    );
};

export default NavBar;