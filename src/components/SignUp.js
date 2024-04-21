import { useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { validate } from "../utils/validateForm";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assets/images/user-icon.png";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();

		const { first_name, last_name, email, password, confirm_password } =
			event.target.elements;
		const userFirstName = first_name.value.trim();
		const userLastName = last_name.value.trim();
		const userEmail = email.value.trim();
		const userPassword = password.value;
		const confirmPassword = confirm_password.value;

		// validate form inputs
		const formValidated = validate(
			"Sign Up",
			userFirstName,
			userLastName,
			userEmail,
			userPassword,
			confirmPassword
		);

		if (formValidated === true) {
			// Submit the form && create new user
			createUserWithEmailAndPassword(auth, userEmail, userPassword)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;

					// Update user's profile information
					updateProfile(auth.currentUser, {
						displayName: userFirstName + " " + userLastName,
						photoURL: UserIcon,
					})
						.then(() => {
							// Profile updated!
							const { uid, email, displayName, photoURL } =
								auth.currentUser;
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoURL: photoURL,
								})
							);

							// redirect to home page
							navigate("/home");
						})
						.catch((error) => {
							// An error occurred
							setErrors({
								profileUpdateError: error,
							});
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// set Sign Up error
					setErrors({
						signUpError: errorMessage,
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
			{errors["profileUpdateError"] && (
				<p
					style={{ fontSize: "0.8em" }}
					className="text-danger text-center"
				>
					{errors["profileUpdateError"]}
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
