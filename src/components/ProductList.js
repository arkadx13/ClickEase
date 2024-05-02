import ProductCard from "./ProductCard";

const ProductList = ({ title, products }) => {
	return (
		<div className="d-flex flex-row overflow-auto">
			{products?.map((product) => (
				<ProductCard item={product} />
			))}
		</div>
	);
};

export default ProductList;
