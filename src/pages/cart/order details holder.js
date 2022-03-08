import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';


let OrderDetailsHolder = ({getClientSecret}) => {

    let cart = useSelector(state => state.cR.cart)

    let [tax, setTax] = useState(0)

    let subTotal = 0;
    let discount = 0;

    cart.forEach(item => {

        let off = item.discount / 100
        let discounted = item.price * off
        let finalPrice = item.price - discounted

        subTotal += item.amount * finalPrice

        // let discountRate = item.discount / 100
        discount += discounted
    })   

    useEffect(() => {
        setTax(tax => {
            return tax = cart.length * 20
        })
    },[cart])

    return (
        <div className='order_details_holder'>
            <div>
                <p>PRICE DETAILS</p>
            </div>    
            <div className="big_div">
                <span>
                    <p>Price ({cart.length} Items)</p>    
                    <p>Rs. {subTotal}</p>    
                </span>   
                <span>
                    <p>Discount</p>    
                    <p style={{color:'rgb(12, 194, 12)'}}>- Rs. {discount}</p>    
                </span> 
                <span>
                    <p>Shipping Fee</p>    
                    <p style={{color:'rgb(12, 194, 12)'}}>Free</p>    
                </span>  
                <span>
                    <p>Tax</p>    
                    <p>Rs. {tax}</p>    
                </span>  
            </div>    
            <div className="total_div">
                <p>Total</p>
                <p>Rs. {Math.ceil(subTotal + tax)}</p>
            </div>    
            <div className="button_div">
                <Link to='/checkout'>                
                    <button onClick={() => getClientSecret(cart)}>PLACE ORDER</button>    
                </Link>
            </div>    
        </div>
    )
}



export default OrderDetailsHolder