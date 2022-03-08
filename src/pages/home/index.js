import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from 'react-router-dom';
import LoginFormHolder from './login form holder';
import { getProductsByPage } from '../../redux/action functions'; 


let Hero = ({setOpenLoginHolder,openLoginHolder}) => {

    let products = useSelector(state =>state.pR.products)


    if (document.readyState === 'loading') {
        return (
            <div className="loading_div">
                <AiOutlineLoading3Quarters className="loading_icon" />
                <p>Loading...</p>
            </div>
        )       
    }

    if (document.readyState === 'complete' && products.length === 0) {
        return (
            <div className="loading_div">
                <p style={{fontSize:'20px'}}>No products found</p>
            </div>
        )
    }

    return (
        <main className="main">
            <LoginFormHolder setOpenLoginHolder={setOpenLoginHolder} 
            openLoginHolder={openLoginHolder}
            />
            <div className="products_sub_holder">
                <div className="products_main_holder">
                    {
                        products.map((item, index) => {

                            let { name, company, image, _id, price } = item

                            return (
                                <Link to={`/products/${_id}`} key={index}>
                                    <div className="single_product_holder">
                                        <div className="image_holder">
                                            <img src={image} alt={name} />
                                        </div>
                                        <div className="details_holder">
                                            <p>{name}</p>
                                            <p className="gray_p">{company}</p> 
                                            <p className="gray_p">Rs. {price}</p>
                                            <button className="add_to_cart" >ADD</button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <PageHolder />
            </div>
        </main>
    )
}


let PageHolder = () => {

    let dispatch = useDispatch()

    let goToNextPage = (e) => {
        dispatch(getProductsByPage(Number(e.target.textContent)))
    }

    return (
        <div className="page_holder">
            <p onClick={goToNextPage}>1</p>
            <p onClick={goToNextPage}>2</p>
            <p onClick={goToNextPage}>3</p>
        </div>
    )
}


export default Hero