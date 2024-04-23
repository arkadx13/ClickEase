import { useSelector } from "react-redux";
import useBestSellersProducts from "../hooks/useBestSellersProducts";
import Header from "./Header";

const Home = () => {
	useBestSellersProducts();
	const products = useSelector(
		(store) => store?.products?.electronicsBestSellers
	);

	if (!products) return;

	return (
		<div>
			<Header />
			<div className="d-flex flex-row flex-wrap">
				{products.map((item) => (
					<div
						key={item.asin}
						className="border border-dark m-2 rounded w-25 p-3"
						style={{ height: "auto" }}
					>
						<img
							src={item.product_photo}
							alt=""
							className="w-100"
						/>
						<p>{item.product_title}</p>
						<p>{item.product_price}</p>
						<p>{item.product_star_rating} ⭐</p>
						<a href={item.product_url} target="_blank">
							go to Product Information
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
