import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ProductDetails = () => {
	const { id } = useParams();

	return (
		<div>
			<Header />
			<h1>ProductDetails</h1>
			<div>id: {id}</div>
		</div>
	);
};

export default ProductDetails;
