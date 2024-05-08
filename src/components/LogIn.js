import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validate } from "../utils/validateForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const LogIn = () => {
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();

		const { email, password } = event.target.elements;
		const userEmail = email.value.trim();
		const userPassword = password.value;

		// validate form inputs
		const formValidated = validate(
			"Log In",
			null,
			null,
			userEmail,
			userPassword,
			null
		);

		if (formValidated === true) {
			// Submit the form and Log In
			signInWithEmailAndPassword(auth, userEmail, userPassword)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrors({
						logInError: error.code,
					});
				});
		} else {
			//there are errors
			setErrors(formValidated);
			return;
		}
	};
	return (
		<Form
			className="bg-light py-3 px-4 d-flex flex-column rounded shadow m-auto z-index-3"
			style={{
				minWidth: "320px",
				width: "350px",
				maxWidth: "350px",
				minheight: "270px",
				zIndex: "3",
			}}
			onSubmit={handleSubmit}
		>
			<div style={{ color: "#6BCF8B" }} className="mb-3 fw-bold fs-4">
				Log In
			</div>
			<Form.Group controlId="email" className="mb-3">
				<Form.Control type="text" placeholder="Email" />
				{errors["email"] && (
					<p
						style={{ fontSize: "0.7em" }}
						className="text-danger px-2"
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
			{errors["logInError"] && (
				<p
					style={{ fontSize: "0.8em" }}
					className="text-danger text-center"
				>
					{errors["logInError"]}
				</p>
			)}
			<Button
				style={{ backgroundColor: "#51C776" }}
				className="mb-3"
				type="submit"
			>
				Log In
			</Button>
			<p style={{ fontSize: "0.7rem" }} className="text-center">
				New to ClickEase? <a href="/signup">Sign Up</a>
			</p>
		</Form>
	);
};

export default LogIn;
