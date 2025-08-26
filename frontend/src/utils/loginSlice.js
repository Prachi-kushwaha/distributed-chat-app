import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"loginSlice",
    initialState:null,
    reducers:{
        addLogin:(state, action)=>{
          return action.payload
        },
        removeLogin:()=>null
    }
})

export const {addLogin, removeLogin} = loginSlice.actions

export default loginSlice.reducer