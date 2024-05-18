import Searches from "../api/Searches";
import openai from "../api/openai";
import { addSuggestions, logErrors, removeSuggestions } from "./searchSlice";

const getSuggestions = async (keyword, dispatch, navigate) => {
	// Use GPT for getting suggestion based on category and type filter inputs
	const queryContent =
		"Act as a Product Recommendation system and suggest a product for the product category : " +
		keyword +
		". Only give me name of 1 product. Example result for product category electronics is 'smartphone'. Just give the result no more long messages.";

	const gptResult = await openai.chat.completions.create({
		messages: [{ role: "user", content: queryContent }],
		model: "gpt-3.5-turbo",
	});

	// Fetching data with query
	Searches(`/search?query=${gptResult.choices?.[0]?.message?.content}`)
		.then((response) => {
			dispatch(removeSuggestions());
			dispatch(addSuggestions(response.data?.data?.products));
		})
		.catch((error) => {
			dispatch(logErrors(error));
			navigate("/error");
		});
};

export default getSuggestions;
