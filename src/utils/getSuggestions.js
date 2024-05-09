import Searches from "../api/Searches";
import openai from "../api/openai";
import { addSuggestions, removeSuggestions } from "./searchSlice";

const getSuggestions = async (keyword, dispatch) => {
	// Use GPT for getting suggestion based on keywords
	const queryContent =
		"Act as a Product Recommendation system and suggest a product for the product category : " +
		keyword +
		". Only give me name of 1 product. Example result for product category electronics is 'smartphone'. Just give the result no more long messages.";

	const gptResult = await openai.chat.completions.create({
		messages: [{ role: "user", content: queryContent }],
		model: "gpt-3.5-turbo",
	});

	console.log(
		`Category ${keyword} => suggested keyword:`,
		gptResult.choices?.[0]?.message?.content
	);

	// Fetching data with query
	Searches(`/search?query=${gptResult.choices?.[0]?.message?.content}`)
		.then((response) => {
			console.log("Suggested products:", response?.data?.data?.products);
			dispatch(removeSuggestions());
			dispatch(addSuggestions(response?.data?.data?.products));
		})
		.catch((error) => console.log(error));
};

export default getSuggestions;
