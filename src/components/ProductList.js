import ProductCard from "./ProductCard";
import ShimmerHome from "./ShimmerHome";

const ProductList = ({ products }) => {
	return products === null ? (
		<ShimmerHome />
	) : (
		<div className="d-flex flex-row overflow-auto">
			{products.map((product) => (
				<ProductCard key={product.asin} item={product} />
			))}
		</div>
	);
};

export default ProductList;
