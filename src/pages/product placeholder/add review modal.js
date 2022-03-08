import React, { useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';



let AddReviewModal = ({showModal, setShowModal, id}) => {

    let [title, setTitle] = useState('')
    let [comment, setComment] = useState('')
    let [rating, setRating] = useState(1)

    let closeModal = () => {
        setShowModal(false)
        document.body.style.height = 'initial';
        document.body.style.overflowY = 'initial';
    }

    //add review----------------------------------
    let submitReview = async (e) => {
        e.preventDefault()

        if (!title || !rating || !comment) {
            alert(`Please provide all the fields`)
        }

        try {
            let { data } = await axios.post(`/apis/v2/reviews`, { title, rating, comment, productId : id })
            console.log(data)

            alert(`You reviewed this product`)
            setComment('')
            setRating(0)
            setTitle('')
            setShowModal(false)
            document.body.style.height = 'initial'
            document.body.style.overflowY = 'initial'
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={`${showModal ? 'add_review_modal show' : 'add_review_modal'}`}>
            <MdOutlineClose id='close_button' onClick={closeModal} />
            <div className='form_holder'>
                <form onSubmit={submitReview}>
                    <div>
                        <p>Title</p>
                        <input type='text' placeholder='Add a title' value={title} onChange={e => setTitle(e.target.value)} />   
                    </div>    
                    <div className='description_holder'>
                        <p>Comment</p>
                        <textarea rows='6' cols='45' value={comment} onChange={e => setComment(e.target.value)}></textarea>    
                    </div>    
                    <div className='rating_holder'> 
                        <p>Product rating</p>
                        <input type='number' min='1' max='5' className='rating_input' value={rating} onChange={e => setRating(e.target.value)} />
                    </div>                     
                    <div className='button_holder'>
                        <button>SUBMIT REVIEW</button>    
                    </div>                     
                </form>   
            </div>
        </div>
    )
}



export default AddReviewModal