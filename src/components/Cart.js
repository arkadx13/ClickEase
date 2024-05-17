import { Button, Container } from "react-bootstrap";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import CartItem from "./CartItem";
import { deleteCartItem, emptyCart } from "../utils/cartSlice";
import { useEffect } from "react";
import DeleteModal from "./DeleteModal";
import { toggleShowEmptyCartModal } from "../utils/modalSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((store) => store?.cart?.cart);
	const showEmptyCartModal = useSelector(
		(store) => store?.modal?.showEmptyCartModal
	);
	const showDeleteItemModal = useSelector(
		(store) => store?.modal?.showDeleteItemModal
	);

	const totalPrice = cart.reduce((acc, currItem) => {
		const addend =
			currItem.product.product_price === null
				? 0
				: currItem.product.product_price.includes("$")
				? Number(currItem.product.product_price.substring(1))
				: Number(currItem.product.product_price);
		return (acc += addend * Number(currItem.quantity));
	}, 0);

	useEffect(() => {
		window.scrollTo(0, 0); // Scrolls to the top of the window
	}, []);

	const handleEmptyCart = () => {
		// call the confirmation modal
		dispatch(toggleShowEmptyCartModal(true));
	};

	return (
		<div className="d-flex flex-column justify-content-between">
			<Header />
			<Container className="d-flex flex-column align-items-center">
				{cart.length === 0 ? (
					<>
						<h4
							className="text-success"
							style={{ paddingTop: "200px" }}
						>
							Cart is empty.
						</h4>
						<p>Find products that you like.</p>
						<Link
							to="/home"
							className="border bg-success px-3 py-2 fs-6 rounded text-decoration-none text-white w-25 text-center"
						>
							Browse
						</Link>
					</>
				) : (
					<>
						<h1
							className="fs-3 text-success text-center fw-bold w-100 py-2 mb-3"
							style={{
								marginTop: "100px",
								borderBottom: "2px solid green",
							}}
						>
							Cart
						</h1>
						<Button
							className="mb-3 align-self-end"
							onClick={handleEmptyCart}
						>
							Empty cart
						</Button>
						{cart.map((item, index) => (
							<>
								<CartItem
									key={"cart-" + index}
									item={item}
									index={index}
								/>
								{showDeleteItemModal && (
									<DeleteModal
										show={showDeleteItemModal}
										deleteAction={() =>
											dispatch(deleteCartItem(index))
										}
										message={
											"Are you sure you want to delete this item?"
										}
									/>
								)}
							</>
						))}
						<div className="mb-3 align-self-end">
							<span className="fw-bold">Total: </span>${" "}
							{totalPrice.toFixed(2)}
						</div>
					</>
				)}
			</Container>
			<Footer />
			{showEmptyCartModal && (
				<DeleteModal
					show={showEmptyCartModal}
					deleteAction={() => dispatch(emptyCart())}
					message={
						"Are you sure you want to delete all items in Cart?"
					}
				/>
			)}
		</div>
	);
};

export default Cart;
