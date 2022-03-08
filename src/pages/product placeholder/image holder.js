import React, { useRef, useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import axios from 'axios';


let ImageHolder = ({value}) => {

    let { product, amount, chosenColor, chosenSize } = value

    let { company,discount, name, image, free_shipping,
    price, _id } = product

    let cookie = ''

    let checkCookie = () => {
        return cookie = document.cookie
    }
    checkCookie()

    let buttonRef = useRef(null)

    useEffect(() => {
        cookie ? buttonRef.current.disabled = false : buttonRef.current.disabled = true
    },[buttonRef, cookie])

    //add to cart-------------------------------
    let addToCart = async () => {
        try {
            let { data } = await axios.post(`/apis/v2/cart`, {
                itemName : name, itemCompany : company, itemImage : image, itemPrice : price,
                productId : _id, freeShipping : free_shipping, itemDiscount : discount, amount,
                size : chosenSize, color : chosenColor
                })

            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    
    return (
         <div className="image_placeholder">
            <div className="image_holder">
                <img src={product.image} alt="sorry" />
            </div>
            {/* <p className={`${showWarning? 'show' : ''}`}>You need to login.</p> */}
            <div className="buttons_holder">
                <button className="add_to_cart_button"
                onClick={addToCart}
                ref={buttonRef} >
                    <HiOutlineShoppingCart className="icons" />
                    ADD TO CART
                </button>
                <button className="buy_now_button">
                    <BsLightning className="icons" />
                    BUY NOW
                </button>
            </div>
         </div>
    )
}


export default ImageHolder