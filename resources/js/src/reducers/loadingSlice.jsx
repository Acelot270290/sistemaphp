import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    show: false,
  },
  reducers: {
    setShowLoading: (state) => {
      state.show = true;
    },
    setHideLoading: (state) => {
      state.show = false;
    },
  },
});

export const { setShowLoading, setHideLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
