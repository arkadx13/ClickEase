import { useEffect } from "react";
import Searches from "../api/Searches";
import { useDispatch } from "react-redux";
import { addElectronicsBestSellers } from "../utils/productSlice";

const useBestSellersProducts = () => {
	const dispatch = useDispatch();

	const getBestSellersElectronics = () => {
		Searches("/best-sellers?category=electronics&page=1")
			.then((response) => {
				console.log(response?.data?.data?.best_sellers);
				dispatch(
					addElectronicsBestSellers(
						response?.data?.data?.best_sellers
					)
				);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getBestSellersElectronics();
	}, []);
};

export default useBestSellersProducts;
