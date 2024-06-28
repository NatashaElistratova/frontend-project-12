import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  activeChatId: 1,
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
      }
    },
});

export const { setChannels, selectChannel } = channelSlice.actions;

export default channelSlice.reducer;