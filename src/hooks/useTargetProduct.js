import { useEffect } from "react";
import Searches from "../api/Searches";
import { useDispatch } from "react-redux";
import { addTargetProduct } from "../utils/productSlice";

const useTargetProduct = (productId) => {
	const dispatch = useDispatch();

	const getProductInfo = () => {
		Searches(`/product-details?asin=${productId}`)
			.then((response) => {
				dispatch(addTargetProduct(response?.data?.data));
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getProductInfo();
	}, []);
};

export default useTargetProduct;
