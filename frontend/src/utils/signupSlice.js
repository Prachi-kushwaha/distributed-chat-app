import {createSlice} from "@reduxjs/toolkit"

const signupSlice = createSlice({
   name:"signupuser",
   initialState:null,
   reducers:{
    addSignupUser:(state, action)=>{
        return action.payload
    },
    removeSignupUser:()=>null
   }
})

export const {addSignupUser, removeSignupUser} = signupSlice.actions

export default signupSlice.reducer