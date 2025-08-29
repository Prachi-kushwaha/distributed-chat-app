import { createSlice } from "@reduxjs/toolkit";

const addFriendsSlice = createSlice({
  name: "addFriends",
  initialState: {
    suggestions: [],
    contacts: [],
  },
  reducers: {
    setSuggestions: (state, action) => {
      // ensure every suggestion has a unique _id
      state.suggestions = action.payload.map(u => ({
        ...u,
        _id: u._id || u.id || `${u.username}-${Date.now()}`,
      }));
    },
     addContact: (state, action) => {
      const user = action.payload;
      const userId = user._id || user.id || `${user.username}-${Date.now()}`;
      
      // only add if not already in contacts
      if (!state.contacts.find((c) => c._id === userId)) {
        state.contacts.push({ ...user, _id: userId });
      }

      console.log("Contacts after add:", state.contacts); // ✅ shows updated contacts
    },
  },
});

export const { setSuggestions, addContact } = addFriendsSlice.actions;
export default addFriendsSlice.reducer;
