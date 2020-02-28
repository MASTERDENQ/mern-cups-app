import React from 'react';
import '../css/ManagerControlStyle.css';
import add from '../assets/add-item.png';
import viewEdit from '../assets/view-edit.png';
import graph from '../assets/graph.png';

const ManagerControlCenter = () => {
    return (
        <div className="ControlCenter">
            <div class="card">
                <img src={add} alt="Avatar" />
                <div class="container">
                    <h4><b>Add Item</b></h4> 
                </div>
            </div> 

            <div class="card">
                <img src={viewEdit} alt="Avatar" />
                <div class="container">
                    <h4><b>View/Edit Item</b></h4> 
                </div>
            </div>     

            <div class="card">
                <img src={graph} alt="Avatar" />
                <div class="container">
                    <h4><b>Graphical</b></h4> 
                    <h4><b>Representation</b></h4> 
                </div>
            </div> 

        </div>
    );
};

export default ManagerControlCenter;