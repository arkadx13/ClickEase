import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
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
		<div className="App">
			<RouterProvider router={appRouter} />
		</div>
	);
}

export default App;
