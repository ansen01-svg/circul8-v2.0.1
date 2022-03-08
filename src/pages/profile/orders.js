import React from 'react';
import { useSelector } from 'react-redux';


let Orders = () => {

    let orders = useSelector(state => state.oR.orders)


    return (
        <div className="orders_holder">
            {
                orders.cart_items.map((item, index) => {

                    return (
                        <div className='single_order' key={index}>
                            <div className="image_holder">
                                <img src={item.image} alt={item.name} />    
                            </div>    
                            <div className="details_holder">
                                <p>{item.name}</p>    
                                <p>Rs. {item.price}</p>    
                                <p>Status 
                                    <span style={{color:`${orders.status === 'pending' ? 'red' : 'rgb(12, 194, 12)'}`}}>
                                         {orders.status}
                                    </span>
                                </p>    
                            </div>    
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Orders