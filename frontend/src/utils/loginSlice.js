import { createSlice } from "@reduxjs/toolkit";


const savedLogin = localStorage.getItem("login")
  ? JSON.parse(localStorage.getItem("login"))
  : null;

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: savedLogin, 
  reducers: {
    addLogin: (state, action) => {
     
      localStorage.setItem("login", JSON.stringify(action.payload)); 
      return action.payload;
    },
    removeLogin: () => {
      localStorage.removeItem("login"); 
      return null;
    },
  },
});

export const { addLogin, removeLogin } = loginSlice.actions;

export default loginSlice.reducer;
