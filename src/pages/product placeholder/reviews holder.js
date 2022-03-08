import React, { useRef, useEffect } from 'react';
import { AiTwotoneStar } from "react-icons/ai";


let ReviewsHolder = ({reviews, setShowModal}) => {

    let cookie = ''

    let checkCookie = () => {
        return cookie = document.cookie
    }
    checkCookie()

    let buttonRef = useRef(null)

    useEffect(() => {
        cookie ? buttonRef.current.disabled = false : buttonRef.current.disabled = true
    },[buttonRef, cookie])
    

    let openAddReviewModal = () => {
        setShowModal(true)
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden';
    }

    return (
            <div className="reviews_holder">
                <p style={{fontSize:'20px'}}>Reviews & Ratings</p>
                <button className="review_button" onClick={openAddReviewModal} ref={buttonRef}>
                    ADD REVIEW
                </button>
                <div className="main_reviews_holder">
                    {   
                        reviews.length === 0 ? 
                        <p style={{fontSize:'17px', color:'gray', padding:'20px'}}>
                            No reviews yet
                        </p> 
                        :
                        reviews.map((item) => {

                            let { comment, rating : productRating, updatedAt, 
                            user, _id : ratingId } = item

                            return (
                                <div className="single_review" key={ratingId}> 
                                    <span>
                                        <p className="rating_p">{productRating} <AiTwotoneStar /></p>
                                        <p style={{fontSize:'14px'}}>{comment}</p>
                                    </span>
                                    <span>
                                        <p style={{fontSize:'14px',color:'gray'}}>{user.username}</p>
                                        <p style={{fontSize:'14px',color:'gray'}}>{updatedAt}</p>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>        
    )
} 


export default ReviewsHolder