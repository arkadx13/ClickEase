import { useEffect } from "react";
import Searches from "../api/Searches";
import { useDispatch } from "react-redux";
import { addTargetProduct } from "../utils/productSlice";

const useTargetProduct = (productId) => {
	console.log("useTargetProduct called");
	const dispatch = useDispatch();

	const getProductInfo = () => {
		Searches(`/product-details?asin=${productId}`)
			.then((response) => {
				console.log("getProductInfo called is there a response?");
				console.log("item data:", response?.data?.data);
				dispatch(addTargetProduct(response?.data?.data));
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getProductInfo();
	}, [getProductInfo]);
};

export default useTargetProduct;
