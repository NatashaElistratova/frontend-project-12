import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  activeChatId: 1,
  messages: [],
};

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      setChannels: (state, action) => {
        state.value = [...state.value, ...action.payload];
      },
      selectChannel: (state, action) => {
        console.log(action.payload);
        state.activeChatId = action.payload;
      },
      setMessages: (state, action) => {
        state.messages = [...state.messages, ...action.payload];
      },
    },
});

export const { setChannels, selectChannel, setMessages } = channelSlice.actions;

export default channelSlice.reducer;