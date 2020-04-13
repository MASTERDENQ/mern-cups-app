import React from 'react';

let SearchMenu = () => {
    return (
        <div>
            <label>Enter the item to search for</label>
            <input type="text" placeholder="Password" />
            <label>ASL</label>
            <input type="file" />
            <label>Audio</label>
            <input type="file" />
        </div>
    );
};

export default SearchMenu;