import React, { useState, useEffect } from 'react';
import { MdLibraryAdd } from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import PersonalInfo from './personal info';
import Orders from './orders';
import { useSelector, useDispatch } from 'react-redux';
import AddProduct from './add products';
import { getAllOrders } from '../../redux/action functions';



let Profile = () => {

    let dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getAllOrders())
    },[dispatch])    

    let [orders,setOrders] = useState(false)

    let currentUser = useSelector(state => state.uR.singleUser)


    return (
        <div className='profile_div'>
            <div className="options_div">
                <div className='hello_div'>
                    <span className='img_span'>
                        <img src="https://www.shareicon.net/data/2016/05/24/770136_man_512x512.png" alt="sorry"/>
                     </span>
                    <p style={{color:'$red', fontSize:'13px'}}>Hello <br/>
                        <span style={{color:'$red', fontSize:'16px'}}>{currentUser.username}</span>
                    </p>
                </div>
                <div className='rest_div'>
                    <section style={{borderBottom: '0.1px solid rgba(0,0,0,0.1)'}}>
                        <GrCircleInformation style={{fontSize:'20px'}}/> 
                        <p onClick={() => setOrders(false)}>Profile Information</p>
                    </section>
                    <section>
                        <MdLibraryAdd style={{fontSize:'20px'}} />
                        <p onClick={() => setOrders(true)}>Orders</p>
                    </section>
                </div>
            </div>
            <div className='display_and_add_products_holder'>
            <div className="display_div">
                {
                    orders ? <Orders/> : <PersonalInfo currentUser={currentUser} />
                }
            </div>
            <AddProduct currentUser={currentUser} />
            </div>
        </div>
    )
}


export default Profile