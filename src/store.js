import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/* import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; */

/* 
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
) */

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
   reducer: {
    account: accountReducer,
    customer: customerReducer,
   } 
})

export default store




