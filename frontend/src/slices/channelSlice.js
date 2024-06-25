import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
      setChannels: (state, action) => {
        state.value = [...state.value, ...action.payload];
      },
    },
});

export const { setChannels } = channelSlice.actions;

export default channelSlice.reducer;