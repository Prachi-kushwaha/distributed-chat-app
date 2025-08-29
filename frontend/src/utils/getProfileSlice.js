import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"getProfile",
    initialState:{},
    reducers:{
        getProfile:(state, action)=>{
            console.log("Reducer got profile:", action.payload)
            return action.payload
        }
    }
})

export const {getProfile} = profileSlice.actions
export default profileSlice.reducer