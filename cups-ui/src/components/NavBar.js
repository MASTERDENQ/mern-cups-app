import React from 'react';
import '../css/NavBarStyle.css';
import avatar from '../assets/avatar.jpg';

const NavBar = () => {
    return (
        <nav className="NavBar">

            <p className="Username">
                Username
            </p>

            <img 
                src={avatar} 
                className="NavBarAvatar" 
                alt="Avatar" 
            />

        </nav>
    );
};

export default NavBar;