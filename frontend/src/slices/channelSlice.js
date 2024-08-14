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
    setChannels(state, action) {
      state.channels = [...state.channels, ...action.payload];
    },
    removeChannel(state, action) {
      const filteredChannels = state.channels.filter((channel) => channel.id !== action.payload);
      state.channels = filteredChannels;
    },
    renameChannel(state, action) {
      const channelIndex = state.channels.findIndex((i) => i.id === action.payload.id);

      if (channelIndex === -1) return;

      state.channels[channelIndex].name = action.payload.name;
    },
    selectChannel(state, action) {
      state.activeChannel = action.payload;
    },
  },
});

export const {
  setChannels, selectChannel, removeChannel, renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
