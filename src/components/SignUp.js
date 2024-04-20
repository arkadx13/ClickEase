import { useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";

const SignUp = () => {
	const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		const { first_name, last_name, email, password, confirm_password } =
			event.target.elements;
		const name = first_name.value;
		console.log(first_name.value);
		console.log(last_name.value);
		console.log(email.value);
		console.log(password.value);
		console.log(confirm_password.value);

		if (form.checkValidity() === false) {
			event.stopPropagation();
			if (name.trim().length === 0) {
				setErrors((prev) => {
					return {
						...prev,
						first_name: "Please input first name",
					};
				});
			}
		}

		setValidated(true);
	};

	console.log("errorObject", errors);
	return (
		<Form
			className="bg-light p-4 d-flex flex-column rounded shadow m-auto"
			style={{ minHeight: "343px", zIndex: "3" }}
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
		>
			<div style={{ color: "#6BCF8B" }} className="mb-3 fw-bold fs-4">
				Sign Up
			</div>
			<Row>
				<Col>
					<Form.Group controlId="first_name" className="mb-3">
						<Form.Control
							type="text"
							placeholder="First name"
							required
						/>
						<Form.Control.Feedback type="invalid">
							{errors["first_name"]}
						</Form.Control.Feedback>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="last_name" className="mb-3">
						<Form.Control
							type="text"
							placeholder="Last name"
							required
						/>
						<Form.Control.Feedback type="invalid">
							I am Feedback
						</Form.Control.Feedback>
					</Form.Group>
				</Col>
			</Row>
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
			<Form.Group controlId="confirm_password" className="mb-3">
				<Form.Control
					type="password"
					placeholder="Confirm Password"
					required
				/>
				<Form.Control.Feedback type="invalid">
					I am Feedback
				</Form.Control.Feedback>
			</Form.Group>
			<Button
				style={{ backgroundColor: "#51C776" }}
				className="mb-3"
				type="submit"
			>
				Sign Up
			</Button>
			<p style={{ fontSize: "0.7rem" }} className="text-center">
				Already registered? <a href="/">Sign In</a>
			</p>
		</Form>
	);
};

export default SignUp;
