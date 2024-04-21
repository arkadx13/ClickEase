export const validate = (
	formType,
	firstName,
	lastName,
	email,
	password,
	confirmPassword
) => {
	let formErrors = {};

	if (formType === "Sign Up") {
		// first name
		if (!firstName) {
			formErrors["first_name"] = "First name is not valid";
		}

		// last name
		if (!lastName) {
			formErrors["last_name"] = "Last  name is not valid";
		}

		// email
		if (
			/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email) ===
			false
		) {
			formErrors["email"] = "Email is not valid";
		}

		// password
		const isPasswordValid =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
				password
			);
		if (!isPasswordValid) {
			formErrors["password"] =
				"Password must be at least 8 characters. Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
		} else {
			//if password is valid
			if (password && !confirmPassword) {
				// if confirm password field is empty
				formErrors["confirm_password"] = "Type your password again";
			} else if (password && confirmPassword) {
				// if password and confirm password fields are not empty
				if (confirmPassword !== password) {
					formErrors["confirm_password"] = "Passwords did not match";
				}
			}
		}
	} else if (formType === "Log In") {
		// email
		if (
			/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email) ===
			false
		) {
			formErrors["email"] = "Email is not valid";
		}

		// password
		const isPasswordValid =
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
				password
			);
		if (!isPasswordValid) {
			formErrors["password"] =
				"Password must be at least 8 characters. Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
		}
	}

	if (Object.keys(formErrors).length > 0) {
		return formErrors;
	} else {
		return true;
	}
};
