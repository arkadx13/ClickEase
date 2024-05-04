import Header from "./Header";
import Footer from "./Footer";
import { Carousel, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useTargetProduct from "../hooks/useTargetProduct";
import { changeImageIndex } from "../utils/modalSlice";
import { removeTargetProduct } from "../utils/productSlice";

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// get product data save on redux store
	useTargetProduct(id);

	const item = useSelector((store) => store?.products?.targetProduct);
	const imageIndex = useSelector((store) => store?.modal?.imageIndex);

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

	return (
		<div className="d-flex flex-column justify-content-between">
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
									<Carousel.Item key={index}>
										<img
											key={index}
											src={photoSrc}
											height={300}
											style={{
												width: "100%",
												objectFit: "contain",
											}}
											alt={`product view number${
												index + 1
											}`}
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
							<span
								className="mx-3"
								style={{ color: "lightgrey" }}
							>
								<s>{item.product_price_max}</s>
							</span>
							{item.product_price.includes("$")
								? item.product_price
								: "$" + item.product_price}
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
									(info) => (
										<div className="d-flex flex-row">
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
						<Form className="mb-3">
							<h5>Color:</h5>
							<div className="d-flex flex-row flex-wrap mx-1 mb-3">
								{item.product_variations.color &&
									item?.product_variations?.color.map(
										(colorVariant) => {
											return colorVariant.photo ? (
												<img
													key={colorVariant.asin}
													width={60}
													src={colorVariant.photo}
													style={{
														objectFit: "contain",
														border: "1px solid #C13E98",
														marginRight: "5px",
													}}
												/>
											) : (
												<div
													className="border m-2 p-1 text-decoration-none text-black"
													// onClick={() => {

													href={`/product/${colorVariant.asin}`}
												>
													{colorVariant.value}
												</div>
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
												<div className="border border-green m-2 p-1">
													{sizeVariant.value}
												</div>
											)
										)}
								</div>
							</div>
							<Form.Group
								controlId="quantity"
								className="d-flex flex-row"
							>
								<h5 className="w-25">Quatity:</h5>
								<Form.Control
									className="w-25"
									type="number"
									name="quantity"
									value={1}
									min={1}
								/>
							</Form.Group>
						</Form>
					</div>
				</Container>
			)}
			{/* {showProductModal && <Productodal item={item} />} */}
			<Footer />
		</div>
	);
};

export default ProductDetails;
