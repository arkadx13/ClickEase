import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productSlice";
import modalReducer from "./modalSlice";
import searchReducer from "./searchSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
		modal: modalReducer,
		search: searchReducer,
	},
});

export default appStore;
