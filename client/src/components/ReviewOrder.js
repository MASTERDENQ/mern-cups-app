import React from 'react';
import { Link } from 'react-router-dom';

let ReviewOrder = props => {

    return (
        <div>
            {props.orderedItems.map(order => (  
                    <div key={order.id}>       
                        {order.value}
                        <br/>
                        {order.name}
                        <br/><br/>
                            
                    </div> 
                ))}
            <Link to="/confirm">
            <button onClick={()=>{props.changeView()}}>Confirm Order</button>
            </Link>
            <button onClick={()=>{props.changeView()}}>Cancel</button>
            
        </div>
        
    );
    
}

export default ReviewOrder;