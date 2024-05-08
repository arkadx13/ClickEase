import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
	name: "search",
	initialState: {
		isSearching: false,
		searchResults: [],
	},
	reducers: {
		toggleIsSearching: (state, action) => {
			state.isSearching = action.payload;
		},
		addSearchResults: (state, action) => {
			state.searchResults.push(action.payload);
		},
		removeSearchResults: (state, action) => {
			state.searchResults = [];
		},
	},
});

export const { toggleIsSearching, addSearchResults, removeSearchResults } =
	gptSlice.actions;

export default gptSlice.reducer;
