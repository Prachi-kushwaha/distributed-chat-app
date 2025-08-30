import { createSlice } from "@reduxjs/toolkit";

const addUserInGroupSlice = createSlice({
    name:"adduseringroup",
    initialState:[],
    reducers:{
        showListOfUsers:(state, action)=>{
            console.log(action.payload)
            return action.payload
        }
    }
})

export const {showListOfUsers} = addUserInGroupSlice.actions
export default addUserInGroupSlice.reducer