import React from "react";
import CartItemsHolder from './cart items holder';
import OrderDetailsHolder from './order details holder';
import { BsCartXFill } from "react-icons/bs";
import { useSelector } from 'react-redux';


let Cart = ({getClientSecret}) => {

    let cookie = ''

    let checkCookie = () => {
        return cookie = document.cookie
    }
    checkCookie()

    let cart = useSelector(state => state.cR.cart)


    if (!cookie) {
        return (
            <main className="cart_first">
                <BsCartXFill style={{fontSize:'100px', color:'gray', fontWeight:'bold'}} />
                <p style={{fontSize:'20px', color:'gray', fontWeight:'bold'}}>
                    Cart is empty.   
                </p> 
                <p style={{fontSize:'20px', color:'gray', fontWeight:'bold'}}>
                    Sign in to view your cart.    
                </p>   
            </main>
        )
    }
    if (document.readyState === 'loading') {
        return (
            <main className="cart_first">
                <p style={{fontSize:'20px', color:'gray', fontWeight:'bold'}}>
                    Loading...   
                </p>                   
            </main>             
        )           
    }
    if (document.readyState === 'complete' && cart.length === 0) {
        return (
            <main className="cart_first">
                <BsCartXFill style={{fontSize:'100px', color:'gray', fontWeight:'bold'}} />
                <p style={{fontSize:'20px', color:'gray', fontWeight:'bold'}}>
                    Cart is empty.   
                </p> 
                <p style={{fontSize:'20px', color:'gray', fontWeight:'bold'}}>
                    Happy shopping !!    
                </p>                   
            </main>             
        )       
    }
    else{
        return (
            <main className="cart">
                <CartItemsHolder />
                <OrderDetailsHolder getClientSecret = {getClientSecret} />
            </main>
        )        
    }
}


export default Cart