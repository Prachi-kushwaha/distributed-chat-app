import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice.js"
import loginReducer from "./loginSlice.js"


const appStore = configureStore({
    reducer:{
        signup:signupReducer,
        login:loginReducer
    }
   
})

export default appStore