import Home from "./Home";
import LandingPage from "./LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function Body() {
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
			path: "/browse",
			element: <Home />,
		},
	]);
	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	);
}

export default Body;
