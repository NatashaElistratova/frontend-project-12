/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logOut(state) {
      state.user = {};
      localStorage.removeItem('user');
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
