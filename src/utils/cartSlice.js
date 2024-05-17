import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
		deleteIndex: null,
	},
	reducers: {
		addToCart: (state, action) => {
			state.cart.unshift(action.payload);
		},
		deleteCartItem: (state, action) => {
			state.cart.splice(action.payload, 1);
		},
		emptyCart: (state) => {
			state.cart.length = 0;
		},
		changeDeleteIndex: (state, action) => {
			state.deleteIndex = action.payload;
		},
	},
});

export const { addToCart, deleteCartItem, emptyCart, changeDeleteIndex } =
	cartSlice.actions;

export default cartSlice.reducer;
