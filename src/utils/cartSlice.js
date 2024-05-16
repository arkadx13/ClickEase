import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
	},
	reducers: {
		addToCart: (state, action) => {
			state.cart.push(action.payload);
		},
		deleteCartItem: (state, action) => {
			state.cart.splice(action.payload, 1);
		},
		emptyCart: (state) => {
			state.cart.length = 0;
		},
	},
});

export const { addToCart, deleteCartItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
