import { Container, Placeholder } from "react-bootstrap";
import ImagePlaceholder from "../assets/images/placeholder-image.svg";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import useTargetProduct from "../hooks/useTargetProduct";
import { useEffect } from "react";

const ShimmerProductDetails = () => {
	const { id } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0); // Scrolls to the top of the window
	}, []);

	// get product data and save on redux store
	useTargetProduct(id);

	return (
		<div className="d-flex flex-column justify-content-between">
			<header
				style={{
					backgroundColor: "#3ec167",
					zIndex: "999",
					margin: "0",
				}}
				className="p-3 text-white position-fixed w-100"
			>
				<Container className="d-flex flex-row justify-content-between">
					<Placeholder lg={1} size="lg" style={{ height: "30px" }} />
					<Placeholder lg={4} size="lg" />
					<Placeholder
						size="lg"
						style={{ borderRadius: "50%", width: "30px" }}
					/>
				</Container>
			</header>
			<Container
				style={{
					paddingTop: "100px",
					maxWidth: "1000px",
					fontSize: "0.9rem",
				}}
				className="d-flex flex-row"
			>
				<div className="w-25 mr-3">
					<img
						src={ImagePlaceholder}
						alt="image placeholder"
						height={200}
					/>
					<div className="d-flex flex-row flex-wrap mt-3">
						<Placeholder
							lg={12}
							size="lg"
							style={{ height: "30px" }}
							bg="secondary"
							className="mb-2"
						/>
						<Placeholder
							lg={8}
							size="lg"
							style={{ height: "30px" }}
							bg="secondary"
						/>
					</div>
				</div>
				<div className="w-75 px-4 d-flex flex-column">
					<h1
						className="fs-4 text-center p-2 text-white p-3"
						style={{ backgroundColor: "#3EC167" }}
					>
						<Placeholder
							lg={8}
							size="lg"
							style={{ height: "30px" }}
						/>
					</h1>
					<Placeholder
						lg={4}
						size="lg"
						style={{ height: "30px" }}
						bg="secondary"
						className="mb-2 border"
					/>
					<Placeholder
						lg={12}
						size="lg"
						style={{ height: "80px" }}
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={4}
						size="lg"
						style={{ height: "30px" }}
						bg="success"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={4}
						size="lg"
						style={{ height: "30px" }}
						bg="success"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={4}
						size="lg"
						style={{ height: "30px" }}
						bg="success"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="secondary"
						className="mb-2"
					/>
					<Placeholder
						lg={4}
						size="lg"
						style={{ height: "30px" }}
						bg="success"
						className="mb-2"
					/>
					<Placeholder
						lg={12}
						size="lg"
						bg="light"
						className="mb-2"
					/>
				</div>
			</Container>
			<Footer />
		</div>
	);
};

export default ShimmerProductDetails;
