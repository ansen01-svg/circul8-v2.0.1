import React, { useEffect, useState } from "react";
import Hero from "./pages/home";
import Cart from "./pages/cart";
import ProductPlaceholder from "./pages/product placeholder";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import MainHeader from "./pages/home/navbar";
import MainFooter from "./pages/home/footer";
import Profile from './pages/profile';
import { useDispatch } from "react-redux";
import { getAllProducts, getAllCartItems } from './redux/action functions';
import Stripe from "./pages/stripe/stripe";


function App() {

  let dispatch = useDispatch()

  let cookie = '';

  let checkCookie = () => {
    return cookie = document.cookie
  }
  checkCookie()

  let [openLoginHolder, setOpenLoginHolder] = useState(false)
  let [openProfileModal, setOpenProfileModal] = useState(false)
  let [clientSecret, setClientSecret] = useState('')
  let [orderId, setOrderId] = useState('')

  useEffect(() => {
    dispatch(getAllProducts())
    if (!cookie) return
    dispatch(getAllCartItems())
  },[dispatch,cookie])

  useEffect(() => {
    setTimeout(() => {
      if (!openProfileModal) return
      setOpenProfileModal(false)
    },4000)
  })

  //payment----------------------------
  let getClientSecret = (cartItems) => {
    fetch("/apis/v2/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    })
      .then((res) => res.json())
      .then((data) => { 
        setClientSecret(data.clientSecret)
        setOrderId(data.order._id)
      });
  }


  return (
    <div className = "App">
      <Router>
        <MainHeader 
        setOpenLoginHolder={setOpenLoginHolder} 
        openProfileModal={openProfileModal}
        setOpenProfileModal={setOpenProfileModal}
        />
          <Routes>
            <Route path = "/" element = { <Hero 
            setOpenLoginHolder = {setOpenLoginHolder} 
            openLoginHolder={openLoginHolder}
            /> } 
            />
            <Route path = "/cart" element = { <Cart getClientSecret = {getClientSecret} /> } />
            <Route path="/profile" element={ <Profile/> } />
            <Route path="/checkout" element= { <Stripe clientSecret = {clientSecret} orderId = {orderId} /> } />
            <Route path = "/products/:id" element = { <ProductPlaceholder/> } />
          </Routes>
        <MainFooter /> 
      </Router>
    </div>
  );
}

export default App;
