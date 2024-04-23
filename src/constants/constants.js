// URL
export const API_URL = "https://real-time-amazon-data.p.rapidapi.com";

// Keys
export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
export const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

//home categories for home page

export const HOME_CATEGORIES = [
	"fashion-womens",
	"beauty",
	"fashion-mens",
	"electronics",
	"computers",
	"grocery",
	"pets",
	"videogames",
	"audible",
];

export const HOME_CATEGORIES_TYPE = {
	"fashion-womens": "NEW-RELEASES",
	beauty: "BEST_SELLERS",
	"fashion-mens": "NEW-RELEASES",
	electronics: "NEW-RELEASES",
	computers: "NEW-RELEASES",
	grocery: "BEST_SELLERS",
	pets: "BEST_SELLERS",
	videogames: "BEST_SELLERS",
	audible: "BEST_SELLERS",
};
