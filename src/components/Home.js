import { useSelector } from "react-redux";
import useBestSellersProducts from "../hooks/useBestSellersProducts";
import Header from "./Header";
import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { Form } from "react-bootstrap";
import Footer from "./Footer";

const Home = () => {
	useBestSellersProducts();
	const products = useSelector((store) => store?.products);

	if (!products) return;

	return (
		<div>
			<Header />
			<div className="d-flex flex-row" style={{ paddingTop: "100px" }}>
				<div
					style={{ width: "15%" }}
					className="position-fixed z-index-3 text-success"
				>
					<Form className="p-3">
						<p className="fw-bold">Search filter:</p>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check label="5 ⭐" type="checkbox" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check label="4 ⭐" type="checkbox" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check label="3 ⭐" type="checkbox" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check label="2 ⭐" type="checkbox" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check label="1 ⭐" type="checkbox" />
						</Form.Group>
						<p className="fw-bold">Sort by Price:</p>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check
								name="priceSort"
								label="Low to High"
								type="radio"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="5-stars">
							<Form.Check
								name="priceSort"
								label="High to Low"
								type="radio"
							/>
						</Form.Group>
					</Form>
				</div>
				<div style={{ width: "85%", marginLeft: "220px" }}>
					{products.fashionBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Fashion"}
							products={products?.fashionBestSellers}
						/>
					)}
					{products.beautyBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Beauty"}
							products={products?.beautyBestSellers}
						/>
					)}
					{products.electronicsBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Electronics"}
							products={products?.electronicsBestSellers}
						/>
					)}
					{products.groceryBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Grocery"}
							products={products?.groceryBestSellers}
						/>
					)}
					{products.appliancesBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Appliances"}
							products={products?.appliancesBestSellers}
						/>
					)}
					{products.videoGamesBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Video Games"}
							products={products?.videoGamesBestSellers}
						/>
					)}
					{products.audibleBestSellers === null ? (
						<Shimmer />
					) : (
						<ProductList
							title={"Audible"}
							products={products?.audibleBestSellers}
						/>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
