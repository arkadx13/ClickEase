import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./LandingPage";
import Error from "./Error";
import ProductDetails from "./ProductDetails";

function Body() {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <LandingPage signingIn={true} />,
		},
		{
			path: "/login",
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
			path: "/product/:id",
			element: <ProductDetails />,
		},
		{
			path: "/error",
			element: <Error />,
		},
	]);

	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	);
}

export default Body;
