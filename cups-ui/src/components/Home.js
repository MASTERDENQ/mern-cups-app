import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
            <Link to="/login">
            <div className="card">
                <div className="container">
                    <h1>MANAGER</h1>
                </div>
            </div>
            </Link>
            
            <Link to="/create">
                <div className="card">
                    <div className="container">
                        <h1>CUSTOMER</h1>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Home
