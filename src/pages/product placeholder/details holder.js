import React from 'react';
import { AiTwotoneStar } from "react-icons/ai";
import ReviewsHolder from './reviews holder';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";


let DetailsHolder = ({value}) => {

    let {product, reviews, setShowModal, amount, setAmount, setChosenColor,
        setChosenSize, selected, setSelected} = value

    let { color,company,description,discount, name,
        price, numberOfReviews, rating, size } = product

    
    //increase amount-------------------------------
    let setPlusAmount = () => {
        setAmount((amount) => {
            if (amount === 50) {
                return amount = 50
            }else{
                return amount + 1
            }
        })
    }

    //decrease amount-------------------------------
    let setMinusAmount = () => {
        setAmount((amount) => {
            if (amount === 0) {
                return amount = 0
            }else{
                return amount - 1
            }
        })
    }

    //choose color----------------------------------
    let findSelectedColor = e => {
        let theColor = e.target.dataset.id

        color.forEach(item => {
            if (item === theColor) {
                e.target.classList.toggle('select')
                setSelected(selected => !selected)
                setChosenColor(chosenColor => {
                    if (!selected){
                        return [...chosenColor, theColor]
                    }
                    if (selected) {
                        return chosenColor.length === 0 ? chosenColor : chosenColor.filter(color => color !== theColor)
                    }
                })
            }
        })
    }

    //choose size----------------------------------
    let findSelectedSize = e => {
        let theSize = e.target.dataset.id
        console.log(theSize)

        size.forEach(item => {
            if (item === theSize) {
                e.target.classList.toggle('select')
                setSelected(selected => !selected)
                console.log(selected)
                setChosenSize(chosenSize => {
                    if (!selected){
                        return [...chosenSize, theSize]
                    }
                    if (selected) {
                        return chosenSize.length === 0 ? chosenSize : chosenSize.filter(color => color !== theSize)
                    }
                })
            }
        })
    }


    return (
        <div className="details_placeholder">
            <div className="main_details_holder">
                <p style={{color:'gray'}}>{company}</p>
                <p>{name}</p>
                <span>
                    <p style={{fontSize:'20px'}}>Rs. {price}</p>
                    <p style={{fontSize:'17px', color:'green'}}>{discount} % off</p>
                </span>
                <span>
                    <p className="rating_p">{rating} <AiTwotoneStar /></p>
                    <p>{numberOfReviews} reviews</p>
                </span>
                <p>{description}</p>
                <p style={{color:'gray'}}>Color </p>
                <span className="colors_span">
                    {
                        color.map((item,index) => {
                            return (
                                <p style={{background:`${item}`}} 
                                onClick={findSelectedColor}
                                data-id={item} key={index}></p>
                            )
                        })
                    }
                </span>
                <p style={{color:'gray'}}>Size</p>
                <span className="size_span">
                    { size.map((item,index) => {
                        return (
                            <p key={index} 
                            data-id={item}
                            onClick={findSelectedSize}>
                                {item}
                            </p>
                        )
                    }) }
                </span>
                <div className="amount_holder">
                    <span style={{background:'rgba(0,0,0,0.7)'}}>
                        <FaMinus style={{fontSize:'15px', color:'white'}} onClick={setMinusAmount} />    
                    </span>    
                    <span className='middle_span'><p>{amount}</p></span>    
                    <span style={{background:'rgba(0,0,0,0.7)'}}>
                        <BsPlusLg style={{fontSize:'15px', color:'white'}} onClick={ setPlusAmount } />    
                    </span>    
                </div>
            </div>
            <ReviewsHolder reviews={reviews} setShowModal={setShowModal} />
        </div>
    )
}


export default DetailsHolder