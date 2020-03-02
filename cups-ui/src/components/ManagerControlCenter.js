import React from 'react';
import '../css/ManagerControlStyle.css';
import add from '../assets/add-item.png';
import viewEdit from '../assets/view-edit.png';
import graph from '../assets/graph.png';

import { Link } from 'react-router-dom';

const ManagerControlCenter = () => {
    return (
        <div className="ControlCenter">
            
            {/* Add Button */}
            <Link to='/add'> 
                <div class="card">
                    <img src={add} alt="Avatar" />

                    <div class="container">
                        <h4><b>Add Item</b></h4> 
                    </div>
                </div> 
            </Link>

            {/* Edit Button */}
            <Link to='/edit'>
                <div class="card">

                    <img src={viewEdit} alt="Avatar" />

                    <div class="container">
                        <h4><b>View/Edit Item</b></h4> 
                    </div>
                </div> 
            </Link>    

            {/* Gragh Button */}
            <Link to='/graph'>
                <div class="card">

                    <img src={graph} alt="Avatar" />

                    <div class="container">
                        <h4><b>Graphical</b></h4> 
                        <h4><b>Representation</b></h4> 
                    </div>
                </div> 
            </Link>

        </div>
    );
};

export default ManagerControlCenter;