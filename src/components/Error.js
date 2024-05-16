import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";

const Error = () => {
	const error = useSelector((store) => store.search.error);
	return (
		<div>
			<Header />
			<div
				className="d-flex flex-column justify-content-center align-items-center"
				style={{ height: "100vh" }}
			>
				<code className="fs-4 text-danger">{error.message}</code>
				<p>{error.code}</p>
			</div>
			<Footer />
		</div>
	);
};

export default Error;
