import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "products",
	initialState: {
		electronicsBestSellers: null,
	},
	reducers: {
		addElectronicsBestSellers: (state, action) => {
			state.electronicsBestSellers = action.payload;
		},
	},
});

export const { addElectronicsBestSellers } = productSlice.actions;

export default productSlice.reducer;
