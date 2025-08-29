import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice.js"
import loginReducer from "./loginSlice.js"
import addFriendReducer from "./addFriends.js"


const appStore = configureStore({
    reducer:{
        signup:signupReducer,
        login:loginReducer,
        addfriend:addFriendReducer
    }
   
})

export default appStore