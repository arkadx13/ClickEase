import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		isSearching: false,
		isFiltering: false,
		searchResults: [],
		filterResults: null,
		suggestions: null,
		error: null,
	},
	reducers: {
		toggleIsSearching: (state, action) => {
			state.isSearching = action.payload;
		},

		addSearchResults: (state, action) => {
			state.searchResults.push(action.payload);
		},
		removeSearchResults: (state) => {
			state.searchResults = [];
		},
		toggleIsFiltering: (state, action) => {
			state.isFiltering = action.payload;
		},
		addFilterResults: (state, action) => {
			state.filterResults = action.payload;
		},
		removeFilterResults: (state) => {
			state.filterResults = null;
		},
		addSuggestions: (state, action) => {
			state.suggestions = action.payload;
		},
		removeSuggestions: (state) => {
			state.suggestions = null;
		},
		logErrors: (state, action) => {
			state.error = action.payload;
		},
		deleteErrors: (state) => {
			state.error = null;
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
	logErrors,
	deleteErrors,
} = searchSlice.actions;

export default searchSlice.reducer;
