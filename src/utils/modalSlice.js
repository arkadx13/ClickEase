import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: {
		showProductModal: false,
		imageIndex: 0,
		showDeleteItemModal: false,
		showEmptyCartModal: false,
	},
	reducers: {
		toggleProductModal: (state, action) => {
			state.showProductModal = action.payload;
		},
		changeImageIndex: (state, action) => {
			state.imageIndex = action.payload;
		},
		toggleDeleteItemModal: (state, action) => {
			state.showDeleteItemModal = action.payload;
		},
		toggleShowEmptyCartModal: (state, action) => {
			state.showEmptyCartModal = action.payload;
		},
	},
});

export const {
	toggleProductModal,
	changeImageIndex,
	toggleDeleteItemModal,
	toggleShowEmptyCartModal,
} = modalSlice.actions;

export default modalSlice.reducer;
