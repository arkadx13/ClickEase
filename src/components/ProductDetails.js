import Header from "./Header";
import Footer from "./Footer";
import { Carousel, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useTargetProduct from "../hooks/useTargetProduct";
import { changeImageIndex } from "../utils/modalSlice";

const ProductDetails = () => {
	const { id } = useParams();
	useTargetProduct(id);
	const dispatch = useDispatch();

	const item = useSelector((store) => store?.products?.targetProduct);
	if (!item) return;
	const imageIndex = useSelector((store) => store?.modal?.imageIndex);

	// // get number of stars
	// let starCounts = "";

	// for (let i = 0; i < Math.floor(Number(item?.product_star_rating)); i++) {
	// 	starCounts += "⭐";
	// }

	// // get the total number user ratings
	// const numberOfRatings = Object.values(item?.rating_distribution).reduce(
	// 	(acc, currVal) => {
	// 		acc += Number(currVal);
	// 		return acc;
	// 	},
	// 	0
	// );

	return (
		<div className="d-flex flex-column justify-content-between">
			<Header />
			{item && (
				<Container
					style={{ paddingTop: "100px", maxWidth: "1000px" }}
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
						{/* <div>
							{item.product_star_rating} {starCounts}|{" "}
							{numberOfRatings > 1
								? numberOfRatings + " Ratings"
								: numberOfRatings + " Rating"}
						</div> */}
					</div>
				</Container>
			)}
			{/* {showProductModal && <Productodal item={item} />} */}
			<Footer />
		</div>
	);
};

export default ProductDetails;
