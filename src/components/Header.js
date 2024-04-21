import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	const handleSearch = (e) => {
		e.preventDefault();
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
				navigate("/error");
			});
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
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
				navigate("/home");
			} else {
				// User is signed out
				dispatch(removeUser());
				if (window.location.pathname === "/signup") {
					navigate("/signup");
				} else {
					navigate("/");
				}
			}
		});
	}, []);

	return (
		<header
			style={{ backgroundColor: "#3ec167" }}
			className="p-3 text-white"
		>
			<Container className="d-flex flex-row justify-content-between">
				<a
					href="/"
					className="fw-bold text-white fs-4 text-decoration-none"
				>
					ClickEase
				</a>
				{user && (
					<>
						<form className="search">
							<input
								type="search"
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
							<div className="d-inline-block py-2">
								{user?.displayName}
							</div>
							<img
								width={40}
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
