import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelReducer,
    modal: modalReducer,
  },
});
