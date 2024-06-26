import { Card, Placeholder } from "react-bootstrap";
import PlaceholderImage from "../assets/images/placeholder-image.svg";
import { useEffect } from "react";

const ShimmerHome = () => {
	useEffect(() => {
		window.scrollTo(0, 0); // Scrolls to the top of the window
	}, []);

	return (
		<div className="d-flex flex-row justify-content-center">
			<Card
				className="m-2"
				style={{
					height: "auto",
					minWidth: "200px",
					width: "200px",
					maxWidth: "250px",
				}}
			>
				<Card.Img variant="top" src={PlaceholderImage} />
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
						<Placeholder xs={8} />
					</Placeholder>
				</Card.Body>
			</Card>
			<Card
				className="m-2"
				style={{
					height: "auto",
					minWidth: "200px",
					width: "200px",
					maxWidth: "250px",
				}}
			>
				<Card.Img variant="top" src={PlaceholderImage} />
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
						<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
						<Placeholder xs={8} />
					</Placeholder>
				</Card.Body>
			</Card>
			<Card
				className="m-2"
				style={{
					height: "auto",
					minWidth: "200px",
					width: "200px",
					maxWidth: "250px",
				}}
			>
				<Card.Img variant="top" src={PlaceholderImage} />
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
						<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
						<Placeholder xs={8} />
					</Placeholder>
				</Card.Body>
			</Card>
			<Card
				className="m-2"
				style={{
					height: "auto",
					minWidth: "200px",
					width: "200px",
					maxWidth: "250px",
				}}
			>
				<Card.Img variant="top" src={PlaceholderImage} />
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
						<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
						<Placeholder xs={8} />
					</Placeholder>
				</Card.Body>
			</Card>
			<Card
				className="m-2"
				style={{
					height: "auto",
					minWidth: "200px",
					width: "200px",
					maxWidth: "250px",
				}}
			>
				<Card.Img variant="top" src={PlaceholderImage} />
				<Card.Body>
					<Placeholder as={Card.Title} animation="glow">
						<Placeholder xs={6} />
					</Placeholder>
					<Placeholder as={Card.Text} animation="glow">
						<Placeholder xs={7} /> <Placeholder xs={4} />{" "}
						<Placeholder xs={4} /> <Placeholder xs={6} />{" "}
						<Placeholder xs={8} />
					</Placeholder>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ShimmerHome;
