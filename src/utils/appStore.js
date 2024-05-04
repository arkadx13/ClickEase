import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productSlice";
import modalReducer from "./modalSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
		modal: modalReducer,
	},
});

export default appStore;
