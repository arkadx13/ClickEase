import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "products",
	initialState: {
		electronicsBestSellers: null,
		beautyBestSellers: null,
		groceryBestSellers: null,
		appliancesBestSellers: null,
		videoGamesBestSellers: null,
		audibleBestSellers: null,
		fashionBestSellers: null,
	},
	reducers: {
		addFashionBestSellers: (state, action) => {
			state.fashionBestSellers = action.payload;
		},
		addElectronicsBestSellers: (state, action) => {
			state.electronicsBestSellers = action.payload;
		},
		addBeautyBestSellers: (state, action) => {
			state.beautyBestSellers = action.payload;
		},
		addGroceryBestSellers: (state, action) => {
			state.groceryBestSellers = action.payload;
		},
		addAppliancesBestSellers: (state, action) => {
			state.appliancesBestSellers = action.payload;
		},
		addVideoGamesBestSellers: (state, action) => {
			state.videoGamesBestSellers = action.payload;
		},
		addAudibleBestSellers: (state, action) => {
			state.audibleBestSellers = action.payload;
		},
		removeProducts: (state, action) => {
			state.electronicsBestSellers = null;
			state.beautyBestSellers = null;
			state.groceryBestSellers = null;
			state.appliancesBestSellers = null;
			state.videoGamesBestSellers = null;
			state.audibleBestSellers = null;
			state.fashionBestSellers = null;
		},
	},
});

export const {
	addFashionBestSellers,
	addElectronicsBestSellers,
	addBeautyBestSellers,
	addGroceryBestSellers,
	addAppliancesBestSellers,
	addPetsBestSellers,
	addVideoGamesBestSellers,
	addAudibleBestSellers,
	removeProducts,
} = productSlice.actions;

export default productSlice.reducer;
