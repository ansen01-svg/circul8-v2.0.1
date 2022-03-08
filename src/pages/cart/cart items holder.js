import React from 'react';
import {  useSelector } from 'react-redux';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';


let CartItemsHolder = () => {

    let cart = useSelector(state => state.cR.cart)

    let removeItem = async (e) => {

        let product = e.target.dataset.id

        try {
            let { data } = await axios.delete(`/apis/v2/cart/${product}/deleteCartItem`)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
      

    return (
        <div className='cart_items_holder'>
            <div className='number_of_items_display'>
                <p>My Cart ({cart.length})</p>    
            </div>    
            <div className='items_display'>
                {
                    cart.map((item, index) => {
                        let { amount, price, name, company, discount, image, product } = item

                        let discountRate = discount / 100
                        let off = price * discountRate
                        let mrp = price - off
                        
                        return (
                            <div className='single_item_holder' key={index}>
                                <Link to={`/products/${product}`}>
                                    <div className='image_holder'>
                                        <img src={image} alt={name} />    
                                    </div>
                                </Link>
                                <div className='details_holder'>
                                    <p>{name}</p>    
                                    <p>{company}</p>    
                                    <p id="price_p">
                                        <span>
                                            Rs. {Math.ceil(mrp)} 
                                        </span>
                                        <span style={{textDecoration:`${discount === 0 ? 'none' : 'line-through'}`,
                                        color:'orangered', fontSize:'14px'}}>
                                            Rs. {price}
                                        </span>
                                        <span style={{color:'rgb(12, 194, 12)'}}>
                                            {discount}% off 
                                        </span>
                                    </p>
                                    <div className='buttons_holder'>
                                        <span className="spans_holder" >
                                            <span data-id={product} className="minus" >
                                                <FaMinus data-id={product} className="minus" />
                                            </span>    
                                            <span id='middle_span'>
                                                <p>{amount}</p>    
                                            </span>    
                                            <span data-id={product} className="add" >
                                                <BsPlusLg data-id={product} className="add"  />
                                            </span>    
                                        </span>    
                                        <span >
                                            <button data-id={product} onClick={removeItem}>REMOVE</button>    
                                        </span>    
                                    </div>    
                                </div>
                            </div>
                        )
                    })
                }    
            </div>    
        </div>
    )
}



export default CartItemsHolder