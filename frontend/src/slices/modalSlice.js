import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpened: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            // const { type, extra } = payload;
            state.isOpened = true;
            // state.type = type;
            // state.extra = extra ?? null;
        },
        closeModal: (state) => {
            state.isOpened = false;
            // state.type = null;
            // state.extra = null;
            },
      
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;