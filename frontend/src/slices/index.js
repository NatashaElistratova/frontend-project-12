import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import channelReducer from './channelSlice.js';
import messageReducer from './messageSlice.js';
import modalReducer from './modalSlice.js';
import { channelsApi } from '../api/channelsApi.js';
import { messagesApi } from '../api/messagesApi.js';

const reducer = combineReducers({
  auth: authReducer,
  channels: channelReducer,
  messages: messageReducer,
  modal: modalReducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});
