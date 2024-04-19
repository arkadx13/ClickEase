import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const SignIn = () => {
	return (
		<div className="d-flex flex-column">
			<div className="sign-in">
				<Container className="d-flex h-50">
					<div className="w-75 text-center align-middle py-5 w-75">
						<h1 style={{ fontSize: "50px" }} className="text-white">
							ClickEase
						</h1>
						<h4 className="text-white">Shop anything you need.</h4>
					</div>
					<Form className="bg-light py-3 px-4 d-flex flex-column rounded w-25">
						<div className="mb-3 fw-bold fs-4">Log In</div>
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
			<footer>
				<p
					style={{ fontSize: "0.8rem" }}
					className="text-center p-3 mt-auto"
				>
					&copy; 2024 Shopee. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
};

export default SignIn;
