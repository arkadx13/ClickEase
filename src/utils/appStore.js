import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productSlice";
import modalReducer from "./modalSlice";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
		modal: modalReducer,
		search: searchReducer,
		cart: cartReducer,
	},
});

export default appStore;
