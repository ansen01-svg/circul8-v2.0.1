import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsBagFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchProducts, getSingleUser } from '../../redux/action functions';
import ProfileModal from './profile modal';



let MainHeader = ({setOpenLoginHolder,openProfileModal,setOpenProfileModal}) => {

    let dispatch = useDispatch()
    let cartItems = useSelector(state => state.cR.cart)

    let cookie = '';

    let checkCookie = () => {
        return cookie = document.cookie
    }
    checkCookie()

    //get single user------
    useEffect(() => {
        if (!cookie) return
        dispatch(getSingleUser())
    },[dispatch,cookie])

    let [searchTerm, setSearchTerm] = useState('')   

    //show login form-------
    let showForm = () => {
        setOpenLoginHolder(true)
        document.body.style.height = '100vh'
        document.body.style.overflowY = 'hidden'
    }

    //submit search form----
    let submitSearchForm = async (e) => {
        e.preventDefault()

        dispatch(getSearchProducts(searchTerm))
    }


    return (
        <header className="header">
            <div className="logo_holder">
                <Link to='/'>
                    <p className="logo">
                        fake<span className="logo_span">Store</span>
                    </p>
                </Link>
            </div>
            <div className="search_holder">
                <form onSubmit={submitSearchForm}>
                    <input type="text" placeholder="search for any products"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button>
                        <FiSearch className="search_icon" />
                    </button>
                </form>
            </div>
            <div className="bag_and_profile_holder">
                <span className="profile_pic_span">
                    {
                        cookie ? 
                            <CgProfile style={{fontSize:'20px', cursor:'pointer'}} 
                            onClick={() => setOpenProfileModal(boolean => !boolean)} /> 
                            :
                            <p onClick={showForm} style={{fontSize:'17px', cursor:'pointer'}}>
                                Login
                            </p>
                    }
                </span>
                <Link to="/cart">
                    <BsBagFill className="bag_icon"/>
                </Link>
                {cookie ? <span className="bag_amount_holder">{cartItems.length}</span> : <></>}
                <ProfileModal openProfileModal={openProfileModal} 
                setOpenProfileModal={setOpenProfileModal}
                checkCookie={checkCookie} />
            </div>
        </header>
    )
}


export default MainHeader