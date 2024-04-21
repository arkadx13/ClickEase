import { useEffect } from "react";
import Home from "./Home";
import LandingPage from "./LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Error from "./Error";

function Body() {
	const dispatch = useDispatch();

	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <LandingPage signingIn={true} />,
		},
		{
			path: "/signup",
			element: <LandingPage signingIn={false} />,
		},
		{
			path: "/home",
			element: <Home />,
		},
		{
			path: "/error",
			element: <Error />,
		},
	]);

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
			} else {
				// User is signed out
				dispatch(removeUser);
			}
		});
	}, []);

	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	);
}

export default Body;
