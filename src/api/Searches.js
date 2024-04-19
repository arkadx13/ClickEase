import Axios from "axios";
import { API_URL, RAPIDAPI_KEY } from "../constants/constants";

export default Axios.create({
	baseURL: API_URL,
	headers: {
		"X-RapidAPI-Key": RAPIDAPI_KEY,
		"X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
	},
});
