import { useDispatch, useSelector } from "react-redux";
import useBestSellersProducts from "../hooks/useBestSellersProducts";
import Header from "./Header";
import ProductList from "./ProductList";
import ShimmerHome from "./ShimmerHome";
import { Button, Form } from "react-bootstrap";
import Footer from "./Footer";
import {
	COUNTRIES,
	PRODUCT_CATEGORIES,
	PRODUCT_TYPES,
} from "../constants/constants";
import Searches from "../api/Searches";
import {
	addFilterResults,
	removeFilterResults,
	removeSuggestions,
	toggleIsFiltering,
	toggleIsSearching,
} from "../utils/searchSlice";
import ProductCard from "./ProductCard";
import getSuggestions from "../utils/getSuggestions";

const Home = () => {
	const dispatch = useDispatch();
	useBestSellersProducts();
	const products = useSelector((store) => store?.products);
	const search = useSelector((store) => store?.search);

	const handleFilter = (e) => {
		e.preventDefault();
		dispatch(toggleIsSearching(false));
		dispatch(removeFilterResults());
		dispatch(toggleIsFiltering(true));
		dispatch(removeSuggestions());

		const { category, type, country } = e.target.elements;

		let parameters = "";

		if (category) {
			parameters += `category=${category.value}&`;
		}

		if (type) {
			parameters += `type=${type.value}&`;
		}

		if (country) {
			parameters += `country=${country.value}`;
		}

		console.log("parameters:", parameters);

		Searches(`/best-sellers?${parameters}`)
			.then((response) => {
				console.log(response?.data?.data?.best_sellers);
				dispatch(addFilterResults(response?.data?.data?.best_sellers));
				// Get suggestion if no products are found
				if (response.data.data?.best_sellers.length === 0) {
					getSuggestions(`${type.value} ${category.value}`, dispatch);
				}
			})
			.catch((error) => console.log(error));
	};

	if (!products) return;

	return (
		<div>
			<Header />
			<div className="d-flex flex-row" style={{ paddingTop: "100px" }}>
				<div
					style={{ width: "15%" }}
					className="position-fixed z-index-3 text-success "
				>
					<Form
						className="p-3 d-flex flex-column"
						onSubmit={handleFilter}
					>
						<div
							className="fw-bold py-1 text-white text-center mb-3"
							style={{
								backgroundColor: "#3EC167",
							}}
						>
							FILTER:
						</div>
						<p style={{ fontSize: "0.9rem", margin: "5px" }}>
							Category:
						</p>
						<Form.Select
							size="sm"
							name="category"
							aria-label="product categories"
						>
							{PRODUCT_CATEGORIES.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</Form.Select>
						<p style={{ fontSize: "0.9rem", margin: "5px" }}>
							Types:
						</p>
						<Form.Select
							size="sm"
							name="type"
							aria-label="product types"
						>
							{PRODUCT_TYPES.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</Form.Select>
						<p style={{ fontSize: "0.9rem", margin: "5px" }}>
							Country:
						</p>
						<Form.Select
							size="sm"
							name="country"
							aria-label="country"
						>
							{COUNTRIES.map((country) => (
								<option key={country.id} value={country.id}>
									{country.name}
								</option>
							))}
						</Form.Select>
						<Button
							type="submit"
							className="fw-bold py-1 bg-success text-white text-center my-3"
						>
							Apply
						</Button>
					</Form>
				</div>
				{search.isSearching ? (
					<div
						style={{
							width: "85%",
							marginLeft: "220px",
							paddingLeft: "10px",
						}}
					>
						<p
							style={{ fontSize: "0.8rem" }}
							className="text-success"
						>
							Search results:
						</p>
						{search.searchResults.length > 0 ? (
							search.searchResults.map((resultObj) => (
								<ProductList products={resultObj.products} />
							))
						) : (
							<>
								<ShimmerHome />
								<ShimmerHome />
								<ShimmerHome />
							</>
						)}
					</div>
				) : search.isFiltering ? (
					<div
						style={{
							width: "85%",
							marginLeft: "220px",
							paddingLeft: "10px",
						}}
					>
						<p
							style={{ fontSize: "0.8rem" }}
							className="text-success"
						>
							Filter results:
						</p>
						{search.filterResults === null ? (
							<>
								<ShimmerHome />
								<ShimmerHome />
								<ShimmerHome />
							</>
						) : search.filterResults.length >= 1 ? (
							<div className="d-flex flex-wrap justify-content-center">
								{search?.filterResults?.map((product) => (
									<ProductCard item={product} />
								))}
							</div>
						) : (
							<div>
								<h6 className="text-danger text-center">
									No products found for your search. You may
									check these other products:
								</h6>
								{search.suggestions === null ? (
									<>
										<ShimmerHome />
										<ShimmerHome />
										<ShimmerHome />
									</>
								) : (
									<div className="d-flex flex-wrap justify-content-center">
										{search?.suggestions?.map((product) => (
											<ProductCard item={product} />
										))}
									</div>
								)}
							</div>
						)}
					</div>
				) : (
					<div
						style={{
							width: "85%",
							marginLeft: "220px",
							paddingLeft: "10px",
						}}
					>
						<ProductList products={products?.fashionBestSellers} />
						<ProductList products={products?.beautyBestSellers} />
						<ProductList
							products={products?.electronicsBestSellers}
						/>
						<ProductList products={products?.groceryBestSellers} />
						<ProductList
							products={products?.videoGamesBestSellers}
						/>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Home;
