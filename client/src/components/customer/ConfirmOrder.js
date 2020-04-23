import React from 'react';

let ConfirmOrder = () => {
    return (
        <div>
            <label>Enter your digital id to confirm your order</label>
            <input type="text" placeholder="Password" />
            <label>ASL</label>
            <input type="file" />
            <label>Audio</label>
            <input type="file" />
        </div>
    );
};

export default ConfirmOrder;