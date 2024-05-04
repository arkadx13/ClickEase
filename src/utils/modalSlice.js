import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		showProductModal: false,
		imageIndex: 0,
	},
	reducers: {
		toggleProductModal: (state, action) => {
			state.showProductModal = !state.showProductModal;
		},
		changeImageIndex: (state, action) => {
			state.imageIndex = action.payload;
		},
	},
});

export const { toggleProductModal, changeImageIndex } = modalSlice.actions;

export default modalSlice.reducer;
