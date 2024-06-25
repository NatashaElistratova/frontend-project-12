import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice.js';

export default configureStore({
  reducer: {
    channels: channelReducer,
  },
});