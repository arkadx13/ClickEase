import { useEffect } from "react";
import Searches from "../api/Searches";
import { useDispatch } from "react-redux";
import { addTargetProduct } from "../utils/productSlice";
import { logErrors } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

const useTargetProduct = (productId) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getProductInfo = () => {
		Searches(`/product-details?asin=${productId}`)
			.then((response) => {
				dispatch(addTargetProduct(response?.data?.data));
			})
			.catch((error) => {
				dispatch(logErrors(error));
				navigate("/error");
			});
	};

	useEffect(() => {
		getProductInfo();
	}, []);
};

export default useTargetProduct;
