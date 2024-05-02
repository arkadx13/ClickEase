import { useEffect } from "react";
import Searches from "../api/Searches";
import { useDispatch } from "react-redux";
import {
	addFashionBestSellers,
	addElectronicsBestSellers,
	addBeautyBestSellers,
	addGroceryBestSellers,
	addAppliancesBestSellers,
	addVideoGamesBestSellers,
	addAudibleBestSellers,
} from "../utils/productSlice";

const useBestSellersProducts = () => {
	const dispatch = useDispatch();

	//Fashion
	const getBestSellersFashion = () => {
		Searches("/best-sellers?category=fashion&page=1")
			.then((response) => {
				dispatch(
					addFashionBestSellers(response?.data?.data?.best_sellers)
				);
			})
			.catch((error) => console.log(error));
	};

	//Electronics
	const getBestSellersElectronics = () => {
		Searches("/best-sellers?category=electronics&page=1")
			.then((response) => {
				dispatch(
					addElectronicsBestSellers(
						response?.data?.data?.best_sellers
					)
				);
			})
			.catch((error) => console.log(error));
	};

	//Beauty
	const getBestSellersBeauty = () => {
		Searches("/best-sellers?category=beauty&page=1")
			.then((response) => {
				dispatch(
					addBeautyBestSellers(response?.data?.data?.best_sellers)
				);
			})
			.catch((error) => console.log(error));
	};

	//Grocery
	const getBestSellersGrocery = () => {
		Searches("/best-sellers?category=grocery&page=1")
			.then((response) => {
				dispatch(
					addGroceryBestSellers(response?.data?.data?.best_sellers)
				);
			})
			.catch((error) => console.log(error));
	};

	//Appliances
	const getBestSellersAppliances = () => {
		Searches("/best-sellers?category=appliances&page=1")
			.then((response) => {
				dispatch(
					addAppliancesBestSellers(response?.data?.data?.best_sellers)
				);
			})
			.catch((error) => console.log(error));
	};

	//Video Games
	const getBestSellersVideoGames = () => {
		Searches("/best-sellers?category=videogames&page=1")
			.then((response) => {
				dispatch(
					addVideoGamesBestSellers(response?.data?.data?.best_sellers)
				);
			})
			.catch((error) => console.log(error));
	};

	//Audible
	const getBestSellersAudible = () => {
		Searches("/best-sellers?category=audible&page=1")
			.then((response) => {
				dispatch(
					addAudibleBestSellers(response?.data?.data?.best_sellers)
				);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getBestSellersFashion();
		getBestSellersElectronics();
		getBestSellersBeauty();
		getBestSellersGrocery();
		getBestSellersAppliances();
		getBestSellersVideoGames();
		getBestSellersAudible();
	}, []);
};

export default useBestSellersProducts;
