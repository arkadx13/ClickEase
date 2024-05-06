import { Carousel, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleProductModal } from "../utils/modalSlice";

const ProductModal = ({ show, item }) => {
	const dispatch = useDispatch();

	return (
		<Modal
			show={show}
			centered
			onHide={() => dispatch(toggleProductModal(false))}
		>
			<Carousel
				variant="dark"
				className="mb-3"
				style={{
					width: "500px",
					height: "400px",
				}}
			>
				{item.product_photos &&
					item.product_photos.map((photoSrc, index) => (
						<Carousel.Item
							key={index}
							className="p-3"
							style={{
								width: "500px",
								height: "400px",
							}}
						>
							<img
								key={index}
								src={photoSrc}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "contain",
								}}
								alt={`product view number${index + 1}`}
								onClick={() =>
									dispatch(toggleProductModal(true))
								}
							/>
						</Carousel.Item>
					))}
			</Carousel>
		</Modal>
	);
};

export default ProductModal;
