import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SignIn = () => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			// event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};
	return (
		<Form
			className="bg-light py-3 px-4 d-flex flex-column rounded shadow m-auto z-index-3"
			style={{ height: "270px", zIndex: "3" }}
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
		>
			<div style={{ color: "#6BCF8B" }} className="mb-3 fw-bold fs-4">
				Log In
			</div>
			<Form.Group controlId="email" className="mb-3">
				<Form.Control type="email" placeholder="Email" required />
				<Form.Control.Feedback type="invalid">
					I am Feedback
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="password" className="mb-3">
				<Form.Control type="password" placeholder="Password" required />
				<Form.Control.Feedback type="invalid">
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
			<p style={{ fontSize: "0.7rem" }} className="text-center">
				New to ClickEase? <a href="/">Sign Up</a>
			</p>
		</Form>
	);
};

export default SignIn;
