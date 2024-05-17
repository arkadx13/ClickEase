import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleDeleteItemModal } from "../utils/modalSlice";

const CartItem = ({ item, index }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { product, color, size, quantity } = item;

	const handleDeleteItem = () => {
		// call modal confirmation delete
		dispatch(toggleDeleteItemModal(true));
	};

	return (
		<div
			className="mb-3 border w-100 d-flex flex-row justify-content-between p-3"
			style={{ fontSize: "0.9rem" }}
		>
			<div
				className="w-25 px-1 d-flex"
				onClick={() => {
					navigate(`/product/${product.asin}`);
				}}
			>
				<img
					src={product.product_photo}
					width={80}
					height={80}
					style={{
						objectFit: "contain",
						border: "1px solid #C13E98",
						width: "50%",
					}}
				/>
				<div className="p-1 bg-success text-white text-center">
					{/* {product.product_title} */}
					{product.product_title.length > 15
						? product.product_title.slice(0, 25) + "..."
						: product.product_title}
				</div>
			</div>
			<div className="w-25 px-1">
				<span className="fw-bold">Color:</span> {color}
			</div>
			<div className="w-25 px-1">
				<span className="fw-bold">Size:</span> {size}
			</div>
			<div className="w-25 px-1">
				<span className="fw-bold">Qty:</span> {quantity}
			</div>
			<div className="w-25 px-1">
				<span className="fw-bold">Price:</span>{" "}
				{product.product_price === null
					? "unavailable"
					: !product.product_price.includes("$")
					? " $ " + product.product_price
					: product.product_price}
			</div>
			<Button className="bg-danger text-white" onClick={handleDeleteItem}>
				Delete
			</Button>
		</div>
	);
};

export default CartItem;
