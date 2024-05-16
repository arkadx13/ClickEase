import openai from "../api/openai";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { removeProducts, removeTargetProduct } from "../utils/productSlice";
import Searches from "../api/Searches";
import {
	addSearchResults,
	deleteErrors,
	logErrors,
	removeFilterResults,
	removeSearchResults,
	removeSuggestions,
	toggleIsFiltering,
	toggleIsSearching,
} from "../utils/searchSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector((store) => store?.user);
	const cart = useSelector((store) => store?.cart?.cart);

	const handleSearch = async (e) => {
		e.preventDefault();
		const keyword = e.target.elements.searchInput.value;

		// Only proceed when search input is not empty
		if (keyword.trim().length > 0) {
			navigate("/home");
			dispatch(removeSearchResults());
			dispatch(toggleIsSearching(true));
			dispatch(toggleIsFiltering(false));

			// Use GPT for getting suggestion based on keywords
			const queryContent =
				"Act as a Product Recommendation system and suggest some products for the query : " +
				keyword +
				". Only give me names of 5 products, forward slash separated like the example result given ahead. Example Result: Blanket/Lawn Mower/Board Game/Perfume/Watch .If query is only one word or two include the query in the result along with your suggestions.";

			const gptResult = await openai.chat.completions.create({
				messages: [{ role: "user", content: queryContent }],
				model: "gpt-3.5-turbo",
			});

			const keywordsArray =
				gptResult.choices?.[0]?.message?.content.split("/");

			// Fetching data with query
			keywordsArray.map((keyword) =>
				Searches(`/search?query=${keyword}`)
					.then((response) => {
						dispatch(addSearchResults(response?.data?.data));
					})
					.catch((error) => {
						navigate("/error");
						dispatch(logErrors(error));
					})
			);
		}
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
				navigate("/error");
				dispatch(logErrors(error));
			});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in
				const { uid, email, displayName, photoURL } = user;

				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoURL: photoURL,
					})
				);

				if (
					window.location.pathname === "/home" ||
					window.location.pathname === "/" ||
					window.location.pathname === "/signup"
				) {
					dispatch(removeTargetProduct());
					navigate("/home");
				} else if (window.location.pathname === "/product/:id") {
					navigate(`/product/${id}`);
				}

				// clear error when leaving Error page
				if (window.location.pathname !== "/error") {
					dispatch(deleteErrors());
				}

				// clear target product data from store when leaving ProductDetails page and going to cart
				if (window.location.pathname === "/cart") {
					dispatch(removeTargetProduct());
				}
			} else {
				// User is signed out
				dispatch(removeUser());
				dispatch(removeProducts());
				dispatch(removeTargetProduct());
				dispatch(removeSearchResults());
				dispatch(removeFilterResults());
				dispatch(removeSuggestions());
				if (window.location.pathname === "/signup") {
					navigate("/signup");
				} else {
					navigate("/");
				}
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<header
			style={{ backgroundColor: "#3ec167", zIndex: "999", margin: "0" }}
			className="p-3 text-white position-fixed w-100"
		>
			<Container className="d-flex flex-row justify-content-between">
				<a
					role="button"
					className="fw-bold text-white fs-4 text-decoration-none"
					onClick={() => {
						navigate("/home");
						dispatch(removeTargetProduct());
						dispatch(toggleIsSearching(false));
						dispatch(removeFilterResults());
						dispatch(toggleIsFiltering(false));
						dispatch(removeSuggestions());
					}}
				>
					ClickEase
				</a>
				{user && (
					<>
						<form className="search" onSubmit={handleSearch}>
							<input
								type="search"
								name="searchInput"
								placeholder="Shop for bags, dresses, groceries ..."
							/>
							<button
								type="submit"
								className="fw-bold"
								style={{ color: "#3EC167" }}
							>
								Search
							</button>
						</form>
						<div className="d-flex flex-row justify-content-between">
							<Link
								to="/cart"
								className="d-inline-block p-2"
								style={{
									color: "#ffffff",
									textDecoration: "none",
									marginRight: "10px",
								}}
							>
								Cart ({cart.length})
							</Link>
							<div className="d-inline-block py-2">
								{user?.displayName}
							</div>
							<img
								width={40}
								height={40}
								src={user?.photoURL}
								alt="user icon"
								className="mx-2 shadow rounded-circle"
							/>
							<button
								style={{
									backgroundColor: "transparent",
									border: "transparent",
									color: "#ffffff",
									fontSize: "0.8rem",
									fontWeight: "bold",
									textDecoration: "underline",
								}}
								className="px-1"
								onClick={handleSignOut}
							>
								Log out
							</button>
						</div>
					</>
				)}
			</Container>
		</header>
	);
};

export default Header;
