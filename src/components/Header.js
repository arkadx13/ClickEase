import { useEffect, useState } from "react";
import openai from "../api/openai";
import { RAPIDAPI_KEY } from "../constants/constants";
import Searches from "../api/Searches";

const Header = () => {
	const handleSearch = (e) => {
		e.preventDefault();
	};
	return (
		<header>
			<div>ClickEase</div>
			<form onSubmit={handleSearch}>
				<input type="text" name="searchQuery" />
				<button type="submit">Search</button>
			</form>
		</header>
	);
};

export default Header;
