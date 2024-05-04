import { Modal } from "react-bootstrap";

const ProductModal = ({ item }) => {
	return (
		<Modal centered>
			<div>
				{item.product_photos.map((photo) => {})}
				<img src={item.product_photos} alt="" />
			</div>
		</Modal>
	);
};

export default ProductModal;
