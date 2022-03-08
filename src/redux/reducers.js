import actionTypes from "./action types";


//users reducer--------------------------------
let initialUsersState = {
    users : [],
    singleUser : {}
}

export let usersReducer = (state = initialUsersState, { type, payload }) => {
    switch (type) {
        case (actionTypes.GET_ALL_USERS) :
            return {...state, users : payload}

        case (actionTypes.GET_SINGLE_USER) :
            return {...state, singleUser : payload}

        case (actionTypes.UPDATE_USER) :
            return {...state, singleUser : payload}
    
        default : return {...state}
    }
}


//products reducer-----------------------------
let initialProductState = {
    products : [],
    singleProduct : {}
}

export let productsReducer = (state = initialProductState, { type, payload }) => {
    switch (type) {
        case(actionTypes.GET_ALL_PRODUCTS) :
            return { ...state, products : payload }

        case(actionTypes.GET_SEARCH_PRODUCTS) :
            return {...state, products : payload}

        case(actionTypes.GET_PRODUCTS_BY_PAGE) :
            return {...state, products : payload}           

        case(actionTypes.GET_SINGLE_PRODUCT) :
            return { ...state, singleProduct : payload }
    
        default : return { ...state }
    }
}


//review reducer-------------------------------
let initialReviewsState = {
    reviews : [],
    singleReview : {},
    singleProductReviews : {}
}

export let reviewsReducer = (state = initialReviewsState, { type, payload }) => {
    switch (type) {
        case (actionTypes.GET_ALL_REVIEWS):
            return {...state, reviews : payload}

        case (actionTypes.ADD_REVIEW):
            return {...state, singleReview : payload}

        case (actionTypes.GET_SINGLE_PRODUCT_REVIEWS) :
            return {...state, singleProductReviews : payload}

        case (actionTypes.UPDATE_REVIEW):
            return {...state, singleReview : payload}
    
        default: return {...state}
    }
}


//cart reducer--------------------------------
let initialCartState = {
    cart : []
}

export let cartReducer = (state = initialCartState, { type, payload }) => {
    switch (type) {
        case (actionTypes.GET_ALL_CART_ITEMS):
            return {...state, cart : payload}

        case (actionTypes.CLEAR_CART) :
            return {...state, cart : []}
            
        default: return {...state}
    }
} 


//orders reducer------------------------------
let initialOrderState = {
    orders : {},
    singleOrder : {}
}


export let ordersReducer = (state = initialOrderState, { type, payload }) => {
    switch (type) {
        case (actionTypes.GET_ALL_ORDERS):
            return {...state, orders : payload}

        case (actionTypes.GET_SINGLE_ORDER):
            return {...state, singleOrder : payload}
    
        default: return {...state}
    }
}