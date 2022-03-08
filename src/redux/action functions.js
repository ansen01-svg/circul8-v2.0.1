import actionTypes from "./action types";
import axios from "axios";


//users------------------------------------------------
//get all users------------
// export let getAllUsers = () => async (dispatch) => {
//     try {
//         let { data } = await axios.get(`http://localhost:5000/apis/v2/users`)
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }

//get single user------------
export let getSingleUser = () => async (dispatch) => {
    try {
        let { data } = await axios.get(`/apis/v2/users/showUser`)

        dispatch({
            type : actionTypes.GET_SINGLE_USER,
            payload : data.user
        })
    } catch (error) {
        console.log(error)
    }
}

//update user---------------
export let updateUser = ({username, email}) => async (dispatch) => {
    try {
        let { data } = await axios.patch(`/apis/v2/users/updateProfile`, { username, email })
        
        dispatch({
            type : actionTypes.UPDATE_USER,
            payload : data.user
        })
    } catch (error) {
        console.log(error)
    }
}


//products---------------------------------------------
//get all products---------
export let getAllProducts = () => async (dispatch) => {
    try{
        let { data } = await axios.get(`/apis/v2/products`)

        dispatch({
            type : actionTypes.GET_ALL_PRODUCTS,
            payload : data.products
        })

    }catch(error){
        console.log(error)
    }
} 

//get single product------
export let getSingleProduct = (id) => async (dispatch) => {
    try {
        let { data } = await axios.get(`/apis/v2/products/${id}`)

        dispatch({
            type : actionTypes.GET_SINGLE_PRODUCT,
            payload : data.product
        })
    } catch (error) {
        console.log(error)
    }
}

//get search products-----
export let getSearchProducts = (searchTerm) => async (dispatch) => {
    try {
        let { data } = await axios.get(`/apis/v2/products?search=${searchTerm}`)

        dispatch({
            type : actionTypes.GET_SEARCH_PRODUCTS,
            payload : data.products
        })
    } catch (error) {
        console.log(error)
    }
}

//get products by page----
export let getProductsByPage = (pageNumber) => async (dispatch) => {
    try {
        let { data } = await axios.get(`/apis/v2/products?page=${pageNumber}`)

        dispatch({
            type : actionTypes.GET_PRODUCTS_BY_PAGE,
            payload : data.products
        })
    } catch (error) {
        console.log(error)
    }
}

//reviews----------------------------------------------
//get all reviews----------
export let getAllreviews = (id) => async (dispatch) => {
    try {
        let { data } = await axios.get(`/apis/v2/products/${id}/singleProductReview`)

        dispatch({
            type : actionTypes.GET_ALL_REVIEWS,
            payload : data.reviews
        })
                
    } catch (error) {
        console.log(error)
    }
}

//get single product reviews----
// export let getSingleProductReviews = () => async (dispatch) => {
//     try {
//         let { data } = await axios.get(`/apis/v2/reviews/singleProductReviews`)
//         console.log(data)        
//     } catch (error) {
//         console.log(error)
//     }
// }

//get single review--------
// export let getSingleReview = (id) => async (dispatch) => {
//     try {
//         let { data } = await axios.get(`/apis/v2/reviews/${id}`)
//         console.log(data)        
//     } catch (error) {
//         console.log(error)
//     }
// }

//update review--------
// export let updateReview = (id) => async (dispatch) => {
//     try {
//         let { data } = await axios.patch(`/apis/v2/reviews/updateReview `)
//         console.log(data)        
//     } catch (error) {
//         console.log(error)
//     }
// }

//cart-------------------------------------------------
//get all cart items------
export let getAllCartItems = () => async (dispatch) => {
    try {
        // let { data : orders } = await axios.get(`/apis/v2/orders/singleUserOrder`)
        let { data : cart } = await axios.get(`/apis/v2/cart/userCartItems`)
        
         dispatch({
             type : actionTypes.GET_ALL_CART_ITEMS,
             payload : cart.cartItems
         })       
    } catch (error) {
        console.log(error)
    }
}

export let clearCart = () => {
    return {
        type : actionTypes.CLEAR_CART,
    }
}

//order------------------------------------------------
//get all orders---------
export let getAllOrders = () => async (dispatch) => {
    try {
        let { data } = await axios.get(`/apis/v2/orders/singleUserOrder`)
        dispatch({
            type : actionTypes.GET_ALL_ORDERS,
            payload : data.order
        })        
    } catch (error) {
        console.log(error)
    }
}

//get single order-------
// export let getSingleOrder = (id) => async (dispatch) => {
//     try {
//         let { data } = await axios.get(`/apis/v2/orders/${id}`)
//         console.log(data)        
//     } catch (error) {
//         console.log(error)
//     }
// }