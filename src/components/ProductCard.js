import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
	const navigate = useNavigate();

	const productTitle =
		item.product_title.length > 45
			? item.product_title.slice(0, 45) + "..."
			: item.product_title;

	const showProductDetails = (productId) => {
		navigate(`/product/${productId}`);
	};

	return (
		<Card
			className="m-2"
			style={{
				height: "300px",
				minWidth: "200px",
				width: "200px",
			}}
			onClick={() => showProductDetails(item.asin)}
		>
			{item.is_best_seller && (
				<div class="ribbon-content">
					<div class="ribbon best-seller">
						<span>Best Seller</span>
					</div>
				</div>
			)}
			<Card.Img
				variant="top"
				src={item.product_photo}
				alt={item.product_title}
				style={{
					height: "160px",
					minwidth: "200px",
					width: "100%",
					objectFit: "cover",
				}}
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
