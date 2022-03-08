import { combineReducers } from "redux";
import { usersReducer, productsReducer, reviewsReducer, cartReducer, ordersReducer } from "./reducers";


let rootReducer = combineReducers({
    uR : usersReducer,
    pR : productsReducer,
    rR : reviewsReducer,
    cR : cartReducer,
    oR : ordersReducer 
})




export default rootReducer