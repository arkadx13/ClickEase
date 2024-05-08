import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productSlice";
import modalReducer from "./modalSlice";
import searhReducer from "./gptSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
		modal: modalReducer,
		search: searhReducer,
	},
});

export default appStore;
