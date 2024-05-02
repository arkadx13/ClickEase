import { Card } from "react-bootstrap";

const ProductCard = ({ item }) => {
	const productTitle =
		item.product_title.length > 45
			? item.product_title.slice(0, 45) + "..."
			: item.product_title;

	const showProductDetails = () => {};

	return (
		<Card
			key={item.asin}
			className="m-2"
			style={{
				height: "auto",
				minWidth: "200px",
				width: "200px",
				maxWidth: "250px",
			}}
			onClick={showProductDetails}
		>
			<Card.Img
				variant="top"
				src={item.product_photo}
				alt={item.product_title}
			/>
			<Card.Body className="d-flex flex-column justify-content-between">
				<Card.Text
					className="mt-2"
					style={{ fontSize: "13px", fontWeight: "bold" }}
				>
					{productTitle}
				</Card.Text>
				<Card.Text className="d-flex flex-row justify-content-between my-1">
					<span className="fw-medium">{item.product_price}</span>
					<span>{item.product_star_rating} ⭐</span>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;
