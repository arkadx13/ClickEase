import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useTargetProduct from "../hooks/useTargetProduct";
import { useSelector } from "react-redux";

const ProductCard = ({ item }) => {
	const navigate = useNavigate();
	const targetProduct = useSelector(
		(store) => store?.products?.targetProduct
	);

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
				height: "auto",
				minWidth: "200px",
				width: "200px",
				maxWidth: "250px",
			}}
			onClick={() => showProductDetails(item.asin)}
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
