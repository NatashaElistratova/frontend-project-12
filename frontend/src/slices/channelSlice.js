import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  activeChannel: { id: '1', name: 'general' },
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
      state.activeChannel = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
  },
});

export const { setChannels, selectChannel, setMessages } = channelSlice.actions;

export default channelSlice.reducer;
