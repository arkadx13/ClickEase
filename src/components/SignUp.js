import { useRef, useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";

const SignUp = () => {
	const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState({});
	const passwordRef = useRef(null);
	const cPasswordRef = useRef(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log("passwordRef", passwordRef.current.value);
		console.log("confirm passwordRef", passwordRef.current.value);

		// confirm password match
		if (
			name === "confirm_password" &&
			value !== passwordRef.current.value
		) {
			setErrors((prev) => {
				return { ...prev, confirm_password: "Passwords do not match" };
			});
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		const { first_name, last_name, email, password, confirm_password } =
			event.target.elements;

		let formErrors = {};

		if (form.checkValidity() === false) {
			event.stopPropagation(); // first name
			if (first_name.value.trim().length === 0) {
				formErrors["first_name"] = "Please input valid first name";
			}

			// last name
			if (last_name.value.trim().length === 0) {
				formErrors["last_name"] = "Please input valid last name";
			}

			// email
			if (email.value.trim().length === 0) {
				formErrors["email"] = "Please input valid email";
			}

			// password
			if (password.value.trim().length === 0) {
				formErrors["password"] = "Please input password";
			} else if (
				password.value.trim().length > 0 &&
				password.value.trim().length < 8
			) {
				formErrors["password"] =
					"Password must be at least 8 characters";
			}

			// confirm password
			if (
				password.value.trim().length > 0 &&
				confirm_password.value.trim().length === 0
			) {
				formErrors["confirm_password"] = "Field cannot be blank";
			} else if (
				confirm_password.value.trim() !== password.value.trim()
			) {
				formErrors["confirm_password"] = "Password did not match";
			}
			setErrors(formErrors);
		}

		if (Object.keys(errors).length === 0) {
			setValidated(true);
		}

		// Log the validated state
		console.log("Validated:", validated);
		console.log("form", form);
		console.log("form.checkValidity() ", form.checkValidity());
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
							{errors["last_name"]}
						</Form.Control.Feedback>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group controlId="email" className="mb-3">
				<Form.Control type="email" placeholder="Email" required />
				<Form.Control.Feedback type="invalid">
					{errors["email"]}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="password" className="mb-3">
				<Form.Control
					type="password"
					placeholder="Password"
					pattern=".{8,}"
					ref={passwordRef}
					required
				/>
				<Form.Control.Feedback type="invalid">
					{errors["password"]}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="confirm_password" className="mb-3">
				<Form.Control
					type="password"
					placeholder="Confirm Password"
					onChange={handleChange}
					isInvalid={!!errors["confirm_password"]}
					ref={cPasswordRef}
					required
				/>
				<Form.Control.Feedback type="invalid">
					{errors["confirm_password"]}
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
				Already registered? <a href="/login">Log In</a>
			</p>
		</Form>
	);
};

export default SignUp;
