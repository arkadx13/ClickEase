import Header from "./Header";
import Footer from "./Footer";
import {
	Button,
	Carousel,
	Container,
	Form,
	OverlayTrigger,
	Popover,
	Spinner,
	Toast,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeImageIndex, toggleProductModal } from "../utils/modalSlice";
import ShimmerProductDetails from "./ShimmerProductDetails";
import ProductModal from "./ProductModal";
import { useRef, useState } from "react";
import { addToCart } from "../utils/cartSlice";
import Searches from "../api/Searches";
import { logErrors } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const item = useSelector((store) => store?.products?.targetProduct);
	const imageIndex = useSelector((store) => store?.modal?.imageIndex);
	const showProductModal = useSelector(
		(store) => store?.modal?.showProductModal
	);
	//Product ID
	const [product, setProduct] = useState(item.asin);

	//Product Color
	const [color, setColor] = useState(null);

	//Product Size
	const [size, setSize] = useState(null);

	// warning empty quantity
	const [isQuantitytFilled, setIsQuantitytFilled] = useState(null);

	// Use for resetting the form after submission
	const formRef = useRef(null);

	// Toast toggle
	const { enqueueSnackbar } = useSnackbar();

	// Loading add to cart button
	const [isAddingTocart, setIsAddingToCart] = useState(false);

	const handleChangeColor = (color, productId) => {
		setColor(color);
		setProduct(productId);
	};

	const handleChangeSize = (e) => {
		setSize(e.target.value);
	};

	const handleAddToCart = (e) => {
		e.preventDefault();
		const { quantity } = e.target.elements;

		if (quantity.value !== "") {
			setIsQuantitytFilled(true);
			setIsAddingToCart(true);

			// get the product data using product ID
			Searches(`/product-details?asin=${product}`)
				.then((response) => {
					// item to store on cartSlice (use in cart page)
					const cartItem = {
						product: response?.data?.data,
						color: color,
						size: size,
						quantity: quantity.value,
					};
					dispatch(addToCart(cartItem));
					// Reset the form and state
					setColor(null);
					setSize(null);
					setIsQuantitytFilled(null);
					// Show Toast for added item to cart
					enqueueSnackbar(
						`${
							response?.data?.data?.product_title.length > 35
								? response?.data?.data?.product_title.slice(
										0,
										34
								  ) + "..."
								: response?.data?.data?.product_title
						} successfully added to cart!`,
						{ variant: "success" }
					);
					setIsAddingToCart(null);
					formRef.current.reset();
				})
				.catch((error) => {
					dispatch(logErrors(error));
					navigate("/error");
				});
		} else {
			setIsQuantitytFilled(false);
		}
	};

	if (!item) return;

	// get number of stars
	let starCounts = "";

	for (let i = 0; i < Math.floor(Number(item?.product_star_rating)); i++) {
		starCounts += "⭐";
	}

	// get the total number user ratings
	const numberOfRatings = Object.values(item?.rating_distribution).reduce(
		(acc, currVal) => {
			acc += Number(currVal);
			return acc;
		},
		0
	);

	return item === null ? (
		<ShimmerProductDetails />
	) : (
		<div className="d-flex flex-column justify-content-between position-relative">
			<Header />
			{item && (
				<Container
					style={{
						paddingTop: "100px",
						maxWidth: "1000px",
						fontSize: "0.9rem",
					}}
					className="d-flex flex-row"
				>
					<div className="w-25 mr-3">
						<Carousel
							variant="dark"
							className="border p-1 mb-3"
							style={{
								height: "300px",
							}}
							activeIndex={imageIndex}
							onSelect={(selectedIndex) =>
								dispatch(changeImageIndex(selectedIndex))
							}
						>
							{item.product_photos &&
								item.product_photos.map((photoSrc, index) => (
									<Carousel.Item
										key={"carousel-item-" + index}
									>
										<img
											src={photoSrc}
											height={300}
											style={{
												width: "100%",
												objectFit: "contain",
											}}
											alt={`product view number${
												index + 1
											}`}
											onClick={() =>
												dispatch(
													toggleProductModal(true)
												)
											}
										/>
									</Carousel.Item>
								))}
						</Carousel>
						<div className="d-flex flex-row flex-wrap">
							{item.product_photos &&
								item.product_photos.map((photoSrc, index) => (
									<img
										key={index}
										src={photoSrc}
										height={50}
										style={{
											objectFit: "contain",
											border:
												index === imageIndex
													? "3px solid #C13E98"
													: "1px solid #C13E98",
											marginRight: "5px",
											opacity:
												index === imageIndex
													? "0.5"
													: "",
										}}
										alt={`product view number${index + 1}`}
										onMouseOver={() =>
											dispatch(changeImageIndex(index))
										}
										onClick={() =>
											dispatch(toggleProductModal(true))
										}
									/>
								))}
						</div>
					</div>
					<div className="w-75 px-4">
						<h1
							className="fs-4 text-center p-2 text-white"
							style={{ backgroundColor: "#3EC167" }}
						>
							{item.product_title}
						</h1>
						<div className="py-2">
							{item.product_star_rating} {starCounts}|{" "}
							{numberOfRatings > 1
								? numberOfRatings + " Ratings"
								: numberOfRatings + " Rating"}
						</div>
						<div className="bg-light fs-2 p-3 mb-3 text-success">
							{item.is_best_seller && (
								<div className="ribbon-content">
									<div className="ribbon best-seller">
										<span className="large">
											Best Seller
										</span>
									</div>
								</div>
							)}
							<span
								className="mx-3"
								style={{ color: "lightgrey" }}
							>
								<s>{item.product_original_price}</s>
							</span>
							{item.product_price === null
								? "unavailable"
								: !item.product_price.includes("$")
								? " $ " + item.product_price
								: item.product_price}
						</div>
						{item.product_description && (
							<div className="mb-3">
								<h5>Product Description:</h5>
								<p>{item.product_description}</p>
							</div>
						)}
						<div className="mb-3">
							<h5>Product Details:</h5>
							{item.product_details &&
								Object.entries(item?.product_details).map(
									(info, index) => (
										<div
											key={"product-details-" + index}
											className="d-flex flex-row"
										>
											<span className="fw-bold w-25">
												{info[0]}:
											</span>{" "}
											<span className="w-75">
												{info[1]}
											</span>
										</div>
									)
								)}
						</div>
						<div className="mb-3">
							<h5>Product Information:</h5>
							{item.product_information && (
								<>
									<div className="d-flex flex-row">
										<span className="fw-bold w-25">
											Manufacturer:
										</span>
										<span className="w-75">
											{
												item.product_information[
													"Manufacturer"
												]
											}
										</span>
									</div>
									<div className="d-flex flex-row">
										<span className="fw-bold w-25">
											Best Sellers Rank:
										</span>
										<span className="w-75">
											{
												item.product_information[
													"Best Sellers Rank"
												]
											}
										</span>
									</div>
									<div className="d-flex flex-row">
										<span className="fw-bold w-25">
											Package Dimensions:
										</span>
										<span className="w-75">
											{
												item.product_information[
													"Package Dimensions"
												]
											}
										</span>
									</div>
								</>
							)}
						</div>
						<Form
							ref={formRef}
							className="mb-3 d-flex flex-column"
							onSubmit={handleAddToCart}
						>
							<h5>Color:</h5>
							<div className="d-flex flex-row flex-wrap mx-1 mb-3">
								{item.product_variations.color &&
									item?.product_variations?.color.map(
										(colorVariant) => {
											return colorVariant.photo ? (
												<OverlayTrigger
													trigger={[
														"hover",
														"focus",
														"click",
													]}
													key={colorVariant.asin}
													placement="right"
													overlay={
														<Popover
															id={`popover-positioned-right`}
														>
															<img
																alt={`${colorVariant.value} color variant`}
																width={200}
																src={
																	colorVariant.photo
																}
															/>
														</Popover>
													}
												>
													<label
														htmlFor={
															colorVariant.asin
														}
														className="d-flex"
														style={{
															width: "90px",
															height: "auto",
															marginRight: "25px",
														}}
														onChange={(e) =>
															handleChangeColor(
																e.target.value,
																colorVariant.asin
															)
														}
													>
														<input
															type="radio"
															id={
																colorVariant.asin
															}
															name="color_variation"
															value={
																colorVariant.value
															}
														/>
														<img
															alt={`${colorVariant.value} color variant`}
															src={
																colorVariant.photo
															}
															style={{
																objectFit:
																	"contain",
																border: "1px solid #C13E98",
																marginRight:
																	"5px",
																marginBottom:
																	"5px",
																width: "100%",
															}}
														/>
													</label>
												</OverlayTrigger>
											) : (
												<label
													key={colorVariant.asin}
													htmlFor={colorVariant.asin}
													className="border  m-2 p-2"
													onChange={(e) =>
														handleChangeColor(
															e.target.value,
															colorVariant.asin
														)
													}
												>
													<input
														type="radio"
														id={colorVariant.asin}
														name="color_variation"
														className="m-1"
														value={
															colorVariant.value
														}
													/>
													{colorVariant.value}
												</label>
											);
										}
									)}
							</div>
							<h5>Size:</h5>
							<div className="d-flex flex-row flex-wrap m-1">
								<div className="d-flex flex-row flex-wrap m-1">
									{item.product_variations.size &&
										item?.product_variations?.size.map(
											(sizeVariant) => (
												<label
													key={sizeVariant.asin}
													htmlFor={sizeVariant.asin}
													className="border m-2 p-2"
													onChange={handleChangeSize}
												>
													<input
														type="radio"
														id={sizeVariant.asin}
														name="size_variation"
														className="m-1"
														value={
															sizeVariant.value
														}
													/>
													{sizeVariant.value}
												</label>
											)
										)}
								</div>
							</div>
							<Form.Group
								controlId="quantity"
								className="d-flex flex-row"
							>
								<h5 className="w-25">Quantity:</h5>
								<Form.Control
									step="1"
									className="w-25"
									type="number"
									name="quantity"
									min="1"
								/>
								{isQuantitytFilled === false && (
									<p className="text-danger m-2">
										Quantity must not be blank.
									</p>
								)}
							</Form.Group>
							<Button
								type="submit"
								className="bg-success p-3 text-white my-5 w-25 align-self-center"
							>
								{isAddingTocart ? (
									<>
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>{" "}
										Adding item...
									</>
								) : (
									"Add to cart"
								)}
							</Button>
						</Form>
					</div>
				</Container>
			)}
			{showProductModal && (
				<ProductModal show={showProductModal} item={item} />
			)}
			<Footer />
		</div>
	);
};

export default ProductDetails;
