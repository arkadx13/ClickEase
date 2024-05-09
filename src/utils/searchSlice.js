import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		isSearching: false,
		isFiltering: false,
		searchResults: [],
		filterResults: null,
		suggestions: null,
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
		toggleIsFiltering: (state, action) => {
			state.isFiltering = action.payload;
		},
		addFilterResults: (state, action) => {
			state.filterResults = action.payload;
		},
		removeFilterResults: (state, action) => {
			state.filterResults = null;
		},
		addSuggestions: (state, action) => {
			state.suggestions = action.payload;
		},
		removeSuggestions: (state, action) => {
			state.suggestions = null;
		},
	},
});

export const {
	toggleIsSearching,
	toggleIsFiltering,
	addSearchResults,
	addFilterResults,
	removeSearchResults,
	removeFilterResults,
	addSuggestions,
	removeSuggestions,
} = searchSlice.actions;

export default searchSlice.reducer;
