import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, getAllreviews } from '../../redux/action functions';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ImageHolder from './image holder';
import DetailsHolder from './details holder';
import AddReviewModal from './add review modal';


let ProductPlaceholder = () => {

    let { id } = useParams()

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleProduct(id))
        dispatch(getAllreviews(id))
    },[dispatch,id])


    let product = useSelector(state => state.pR.singleProduct)
    let reviews = useSelector(state => state.rR.reviews)

    let [showModal, setShowModal] = useState(false)

    //for details component------------------------
    let [amount, setAmount] = useState(1)
    let [chosenColor, setChosenColor] = useState([])
    let [chosenSize, setChosenSize] = useState([])
    let [selected, setSelected] = useState(false)


    if (Object.keys(product).length === 0) {
        return (
            <div className="loading_div">
                <AiOutlineLoading3Quarters className="loading_icon" />
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="placeholder">
            <AddReviewModal showModal={showModal} setShowModal={setShowModal} id={product._id} />
            <ImageHolder value={{product, amount, chosenColor, chosenSize}} />
            <DetailsHolder value={{product,reviews,setShowModal,amount,setAmount,setChosenColor,
            setChosenSize,selected,setSelected}}  />
        </div>
    )
}


export default ProductPlaceholder