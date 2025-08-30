import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice.js"
import loginReducer from "./loginSlice.js"
import addFriendReducer from "./addFriends.js"
import getProfileReducer from "./getProfileSlice.js"
import addUserInGroup from "./addUserGroup.js"


const appStore = configureStore({
    reducer:{
        signup:signupReducer,
        login:loginReducer,
        addfriend:addFriendReducer,
        profile:getProfileReducer,
        group:addUserInGroup
    }
   
})

export default appStore