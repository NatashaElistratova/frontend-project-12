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
    removeChannel: (state, action) => {
      const filteredChannels = state.value.filter((channel) => channel.id !== action.payload);
      state.value = filteredChannels;
    },
    updateChannel: (state, action) => {
      const updatedValue = state.value
        .map((i) => (i.id === action.payload.id ? action.payload : i));

      state.value = updatedValue;
    },
    selectChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
  },
});

export const {
  setChannels, selectChannel, removeChannel, updateChannel, setMessages,
} = channelSlice.actions;

export default channelSlice.reducer;
