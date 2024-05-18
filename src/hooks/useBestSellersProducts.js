import { useEffect } from "react";
import Searches from "../api/Searches";
import { useDispatch } from "react-redux";
import {
	addFashionBestSellers,
	addElectronicsBestSellers,
	addBeautyBestSellers,
	addGroceryBestSellers,
	addVideoGamesBestSellers,
} from "../utils/productSlice";
import { logErrors } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

const useBestSellersProducts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Fashion
	const getBestSellersFashion = () => {
		Searches("/best-sellers?category=fashion&page=1")
			.then((response) => {
				dispatch(
					addFashionBestSellers(response.data?.data?.best_sellers)
				);
			})
			.catch((error) => {
				console.log(error);
				dispatch(logErrors(error));
				navigate("/error");
			});
	};

	//Electronics
	const getBestSellersElectronics = () => {
		Searches("/best-sellers?category=electronics&page=1")
			.then((response) => {
				dispatch(
					addElectronicsBestSellers(response.data?.data?.best_sellers)
				);
			})
			.catch((error) => {
				console.log(error);
				dispatch(logErrors(error));
				navigate("/error");
			});
	};

	//Beauty
	const getBestSellersBeauty = () => {
		Searches("/best-sellers?category=beauty&page=1")
			.then((response) => {
				dispatch(
					addBeautyBestSellers(response.data?.data?.best_sellers)
				);
			})
			.catch((error) => {
				console.log(error);
				dispatch(logErrors(error));
				navigate("/error");
			});
	};

	//Grocery
	const getBestSellersGrocery = () => {
		Searches("/best-sellers?category=grocery&page=1")
			.then((response) => {
				dispatch(
					addGroceryBestSellers(response.data?.data?.best_sellers)
				);
			})
			.catch((error) => {
				console.log(error);
				dispatch(logErrors(error));
				navigate("/error");
			});
	};

	//Video Games
	const getBestSellersVideoGames = () => {
		Searches("/best-sellers?category=videogames&page=1")
			.then((response) => {
				dispatch(
					addVideoGamesBestSellers(response.data?.data?.best_sellers)
				);
			})
			.catch((error) => {
				console.log(error);
				dispatch(logErrors(error));
				navigate("/error");
			});
	};

	useEffect(() => {
		getBestSellersFashion();
		getBestSellersElectronics();
		getBestSellersBeauty();
		getBestSellersGrocery();
		getBestSellersVideoGames();
	}, []);
};

export default useBestSellersProducts;
