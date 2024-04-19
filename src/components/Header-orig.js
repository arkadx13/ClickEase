import { useEffect, useState } from "react";
import openai from "../api/openai";
import { RAPIDAPI_KEY } from "../constants/constants";
import Searches from "../api/Searches";

const Header = () => {
	const [data, setData] = useState(null);
	const [searchQuery, setSearchQuery] = useState(null);
	const [gptSuggestion, setGptSuggestion] = useState([]);

	// const fetchData = async (keyword, index) => {
	// 	//API call
	// 	const searchResultData = await fetch(
	// 		"https://real-time-amazon-data.p.rapidapi.com/search?query=" +
	// 			keyword,
	// 		{
	// 			headers: {
	// 				"X-RapidAPI-Key": RAPIDAPI_KEY,
	// 				"X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
	// 			},
	// 		}
	// 	);
	// 	const json = await searchResultData.json();
	// 	console.log(
	// 		`keyword: ${keyword} (index: ${index}) json:______________`,
	// 		json
	// 	);

	// 	return json.data;
	// };

	const handleSearch = async (e) => {
		e.preventDefault();
		const keyword = e.target.elements.searchQuery.value;
		setSearchQuery(keyword);

		const queryContent =
			"Act as a Product Recommendation system and suggest some products for the query : " +
			keyword +
			". Only give me names of 5 products, forward slash separated like the example result given ahead. Example Result: Blanket/Lawn Mower/Board Game/Perfume/Watch .If query is only one word or two include the query in the result along with your suggestions.";

		const gptResult = await openai.chat.completions.create({
			messages: [{ role: "user", content: queryContent }],
			model: "gpt-3.5-turbo",
		});

		console.log(gptResult);
		const queryKeywords =
			gptResult.choices?.[0]?.message?.content.split("/");
		setGptSuggestion(queryKeywords);

		// Fetch the data with the query
		// const promiseArray = queryKeywords.map((keyword, index) =>
		// 	fetchData(keyword, index)
		// );
		const searchResults = await Promise.all(promiseArray);
		console.log("searchig for each keyword- RESULT:", searchResults);
	};

	return (
		<header>
			{/* <img src="" alt="logo" /> */}
			<form onSubmit={handleSearch}>
				<input type="text" name="searchQuery" />
				<button type="submit">Fetch Data</button>
			</form>
			<div>
				<strong>Search Query:</strong>
			</div>
			<p>{searchQuery}</p>
			<div>
				<strong>GPT suggestion from query:</strong>
			</div>
			<p>{gptSuggestion.join(", ")}</p>
			<div>Search results:</div>
			{gptSuggestion.map((result, id) => (
				<p key={id}>
					All searches related to keyword ---------{result}
				</p>
			))}
		</header>
	);
};

export default Header;
