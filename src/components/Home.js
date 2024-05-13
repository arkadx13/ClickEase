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
	PRODUCT_CONDITION,
	PRODUCT_TYPES,
	SORT_BY,
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

		let parameters = `category=${category.value}&type=${type.value}&country=${country.value}`;

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

	const handleAdvancedSearch = (e) => {
		e.preventDefault();

		const {
			query,
			sort_by,
			condition,
			minimum_price,
			maximum_price,
			brand,
		} = e.target.elements;

		if (query.value.trim().length !== 0) {
			console.log("valid api call");
			dispatch(toggleIsSearching(false));
			dispatch(removeFilterResults());
			dispatch(toggleIsFiltering(true));
			dispatch(removeSuggestions());

			// assemble parameters for advanced search
			let parameters = `query=${query.value.trim()}&sort_by=${
				sort_by.value
			}&condition=${condition.value}`;

			if (minimum_price.value) {
				parameters += `&min_price=${minimum_price.value}`;
			}

			if (maximum_price.value) {
				parameters += `&max_price=${maximum_price.value}`;
			}

			if (brand.value) {
				parameters += `&brand=${brand.value.trim()}`;
			}

			console.log("advanced search parameters: ", parameters);
			Searches(`/search?${parameters}`)
				.then((response) => {
					console.log(response);
					dispatch(addFilterResults(response?.data?.data?.products));
					// Get suggestion if no products are found
					if (response?.data?.data?.products.length === 0) {
						getSuggestions(
							`${query.value.trim()} ${brand.value.trim()}`,
							dispatch
						);
					}
				})
				.catch((error) => console.log(error));
		}
	};

	if (!products) return;

	return (
		<div>
			<Header />
			<div className="d-flex flex-row" style={{ paddingTop: "100px" }}>
				<div style={{ width: "15%" }} className="text-success">
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
					<Form
						className="p-3 d-flex flex-column"
						onSubmit={handleAdvancedSearch}
					>
						<div
							className="fw-bold py-1 text-white text-center mb-3"
							style={{
								backgroundColor: "#3EC167",
							}}
						>
							ADVANCED SEARCH:
						</div>
						<Form.Group className="mb-3" controlId="query">
							<Form.Label>Search</Form.Label>
							<Form.Control type="text" placeholder="ex. phone" />
						</Form.Group>
						<p style={{ fontSize: "0.9rem", margin: "5px" }}>
							Sort by:
						</p>
						<Form.Select name="sort_by" id="sort_by">
							{SORT_BY.map((sort) => (
								<option key={sort} value={sort}>
									{sort}
								</option>
							))}
						</Form.Select>
						<p style={{ fontSize: "0.9rem", margin: "5px" }}>
							Condition:
						</p>
						<Form.Select name="conditon" id="condition">
							{PRODUCT_CONDITION.map((condition) => (
								<option key={condition} value={condition}>
									{condition}
								</option>
							))}
						</Form.Select>
						<p style={{ fontSize: "0.9rem", margin: "5px" }}>
							Price range:
						</p>
						<div className="d-flex flex-row">
							<Form.Control
								step="1"
								type="number"
								name="minimum_price"
								placeholder="₱ min"
								className="w-50 mx-1"
							/>
							<Form.Control
								step="1"
								type="number"
								name="maximum_price"
								placeholder="₱ max"
								className="w-50 mx-1"
							/>
						</div>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="ex. Samsung"
							/>
						</Form.Group>
						<Button
							type="submit"
							className="fw-bold py-1 bg-success text-white text-center my-3"
						>
							Search
						</Button>
					</Form>
				</div>
				{search.isSearching ? (
					<div
						style={{
							width: "85%",
							paddingLeft: "50px",
						}}
					>
						<p
							style={{ fontSize: "0.8rem" }}
							className="text-success"
						>
							Results:
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
							paddingLeft: "50px",
						}}
					>
						<p
							style={{ fontSize: "0.8rem" }}
							className="text-success"
						>
							Results:
						</p>
						{search.filterResults === null ? (
							<>
								<ShimmerHome />
								<ShimmerHome />
								<ShimmerHome />
							</>
						) : search.filterResults.length >= 1 ? (
							<div className="d-flex flex-wrap justify-content-start">
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
									<div className="d-flex flex-wrap justify-content-start">
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
							paddingLeft: "50px",
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
