import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    removeUser: (state) => {
      state.userData = {};
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
