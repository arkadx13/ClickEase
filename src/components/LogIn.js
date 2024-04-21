import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { validate } from "../utils/validateForm";

const LogIn = () => {
	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		const { email, password } = event.target.elements;

		const formErrors = validate(
			null,
			null,
			email.value.trim(),
			password.value,
			null
		);

		if (formErrors === true) {
			// Submit the form
			alert("form submitted");
		} else {
			//there are errors
			event.preventDefault();
			setErrors(formErrors);
			return;
		}
		console.log("errorObject", errors);
	};
	return (
		<Form
			className="bg-light py-3 px-4 d-flex flex-column rounded shadow m-auto z-index-3"
			style={{
				maxWidth: "350px",
				minWidth: "320px",
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
