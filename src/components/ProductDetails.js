import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useTargetProduct from "../hooks/useTargetProduct";

const ProductDetails = () => {
	const { id } = useParams();
	useTargetProduct(id);

	const item = useSelector((store) => store?.products?.targetProduct);

	return (
		<div className="d-flex flex-column justify-content-between">
			<Header />
			{item && (
				<Container style={{ paddingTop: "100px" }}>
					<h1>{item.product_title}</h1>
					<div>description: {item.product_description}</div>
					<div>{item.product_price}</div>
					<div>{item.product_star_rating}</div>
					<div>
						{item.product_photos &&
							item.product_photos.map((photo) => (
								<img src={photo} />
							))}
					</div>
				</Container>
			)}

			<Footer />
		</div>
	);
};

export default ProductDetails;
