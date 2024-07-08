import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessage: (state, action) => {
      const newMessages = [...state.messages, action.payload];
      if (newMessages.length > 1000) {
        newMessages.shift(); // remove the oldest message
      }

      state.messages = newMessages;
    },
    removeMessage: (state, action) => {
      const transaction_id = action.payload;
      state.messages = state.messages.filter(
        (message) => message.data.transaction_id !== transaction_id
      );
    },
  },
});

export const { setMessage, removeMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
