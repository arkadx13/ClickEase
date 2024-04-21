import { useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { validate } from "../utils/validateForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const SignUp = () => {
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();

		const { first_name, last_name, email, password, confirm_password } =
			event.target.elements;
		const userEmail = email.value.trim();
		const userPassword = password.value.trim();

		// validate form inputs
		const formValidated = validate(
			"Sign Up",
			first_name.value.trim(),
			last_name.value.trim(),
			userEmail,
			userPassword,
			confirm_password.value
		);

		if (formValidated === true) {
			// Submit the form && create new user
			createUserWithEmailAndPassword(auth, userEmail, userPassword)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					console.log(user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// set Sign Up error
					setErrors({
						signUpError: errorMessage,
					});
				});

			alert("Signing up");
		} else {
			//there are errors
			setErrors(formValidated);
			return;
		}
	};

	return (
		<Form
			className="bg-light p-4 d-flex flex-column rounded shadow m-auto"
			style={{
				maxWidth: "350px",
				minWidth: "320px",
				minHeight: "343px",
				zIndex: "3",
			}}
			onSubmit={handleSubmit}
		>
			<div style={{ color: "#6BCF8B" }} className="mb-3 fw-bold fs-4">
				Sign Up
			</div>
			<Row>
				<Col>
					<Form.Group controlId="first_name" className="mb-3">
						<Form.Control type="text" placeholder="First name" />
						{errors["first_name"] && (
							<p
								style={{ fontSize: "0.7em" }}
								className="text-danger text-center"
							>
								{errors["first_name"]}
							</p>
						)}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="last_name" className="mb-3">
						<Form.Control type="text" placeholder="Last name" />
						{errors["last_name"] && (
							<p
								style={{ fontSize: "0.7em" }}
								className="text-danger text-center"
							>
								{errors["last_name"]}
							</p>
						)}
					</Form.Group>
				</Col>
			</Row>
			<Form.Group controlId="email" className="mb-3">
				<Form.Control type="text" placeholder="Email" />
				{errors["email"] && (
					<p
						style={{ fontSize: "0.7em" }}
						className="text-danger px-3"
					>
						{errors["email"]}
					</p>
				)}
			</Form.Group>
			<Form.Group controlId="password" className="mb-3">
				<Form.Control type="password" placeholder="Password" />
				{errors["password"] && (
					<p
						style={{ fontSize: "0.7em" }}
						className="text-danger text-center"
					>
						{errors["password"]}
					</p>
				)}
			</Form.Group>
			<Form.Group controlId="confirm_password" className="mb-3">
				<Form.Control type="password" placeholder="Confirm Password" />
				{errors["confirm_password"] && (
					<p
						style={{ fontSize: "0.7em" }}
						className="text-danger px-3"
					>
						{errors["confirm_password"]}
					</p>
				)}
			</Form.Group>
			{errors["signUpError"] && (
				<p
					style={{ fontSize: "0.8em" }}
					className="text-danger text-center"
				>
					{errors["signUpError"]}
				</p>
			)}
			<Button
				style={{ backgroundColor: "#51C776" }}
				className="mb-3"
				type="submit"
			>
				Sign Up
			</Button>
			<p style={{ fontSize: "0.7rem" }} className="text-center">
				Already registered? <a href="/">Log In</a>
			</p>
		</Form>
	);
};

export default SignUp;
