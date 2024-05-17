import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleDeleteItemModal } from "../utils/modalSlice";
import { changeDeleteIndex, deleteCartItem } from "../utils/cartSlice";
import DeleteModal from "./DeleteModal";

const CartItem = ({ item, index }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { product, color, size, quantity } = item;
	const showDeleteItemModal = useSelector(
		(store) => store?.modal?.showDeleteItemModal
	);
	const deleteIndex = useSelector((store) => store?.cart?.deleteIndex);

	const handleDeleteItem = () => {
		// call modal confirmation delete
		dispatch(toggleDeleteItemModal(true));
		dispatch(changeDeleteIndex(index));
	};

	return (
		<div
			className="mb-3 border w-100 d-flex flex-row justify-content-between p-3"
			style={{ fontSize: "0.9rem" }}
		>
			{showDeleteItemModal && (
				<DeleteModal
					show={showDeleteItemModal}
					deleteAction={() => {
						dispatch(deleteCartItem(deleteIndex));
						dispatch(toggleDeleteItemModal(false));
						dispatch(changeDeleteIndex(null));
					}}
					message={"Are you sure you want to delete this item?"}
				/>
			)}
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
					alt={product.product_title}
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
