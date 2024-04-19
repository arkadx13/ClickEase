import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import HeroLandingImage from "../assets/images/landing-page-image.jpeg";

const SignIn = () => {
	return (
		<div className="d-flex flex-column">
			<header
				style={{ backgroundColor: "#3ec167" }}
				className="p-3 text-white"
			>
				<Container>
					<a
						href="/"
						className="fw-bold text-white text-decoration-none"
					>
						ClickEase
					</a>
				</Container>
			</header>
			<div className="sign-in bg-white">
				<Container className="d-flex" style={{ height: "500px" }}>
					<div
						style={{ fontSize: "50px", color: "#6BCF8B" }}
						className="landing-hero w-75 align-middle"
					>
						<h1 style={{ opacity: "1", zIndex: "3" }}>ClickEase</h1>
						<h4 style={{ opacity: "1", zIndex: "3" }}>
							Shop anything you need.
						</h4>
					</div>
					<Form
						className="bg-light py-3 px-4 d-flex flex-column rounded shadow m-auto"
						style={{ height: "270px" }}
					>
						<div
							style={{ color: "#6BCF8B" }}
							className="mb-3 fw-bold fs-4"
						>
							Log In
						</div>
						<Form.Group controlId="email" className="mb-3">
							<Form.Control
								required
								type="text"
								placeholder="Email"
							/>
							<Form.Control.Feedback>
								I am Feedback
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="password" className="mb-3">
							<Form.Control
								required
								type="password"
								placeholder="Password"
							/>
							<Form.Control.Feedback>
								I am Feedback
							</Form.Control.Feedback>
						</Form.Group>
						<Button
							style={{ backgroundColor: "#51C776" }}
							className="mb-3"
							type="submit"
						>
							Log In
						</Button>
						<p
							style={{ fontSize: "0.7rem" }}
							className="text-center"
						>
							New to ClickEase? <a href="/">Sign Up</a>
						</p>
					</Form>
				</Container>
			</div>
			<footer className="text-center p-3 mt-auto bg-light">
				<p style={{ fontSize: "0.8rem" }}>
					<a href="https://www.freepik.com/free-vector/hands-with-money-flat-composition-with-female-hands-holding-discount-cards-coin-stacks-smartphone-shopping-bags-vector-illustration_37917159.htm#query=online%20shopping&position=7&from_view=keyword&track=ais&uuid=dd09d2fb-aeda-408e-88e3-0e125ab216bd">
						Image by macrovector
					</a>
					on Freepik
				</p>
				<p
					style={{ fontSize: "0.8rem" }}
					// className="text-center p-3 mt-auto"
				>
					&copy; 2024 ClickEase. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
};

export default SignIn;
