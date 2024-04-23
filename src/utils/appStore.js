import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./productSlice";

const appStore = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
	},
});

export default appStore;
