import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  defaultChannel: { id: '1', name: 'general' },
  activeChannel: { id: '1', name: 'general' },
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = [...state.channels, ...action.payload];
    },
    removeChannel: (state, action) => {
      const filteredChannels = state.channels.filter((channel) => channel.id !== action.payload);
      state.channels = filteredChannels;
    },
    updateChannel: (state, action) => {
      const updatedValue = state.channels
        .map((i) => (i.id === action.payload.id ? action.payload : i));

      state.channels = updatedValue;
    },
    selectChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});

export const {
  setChannels, selectChannel, removeChannel, updateChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
