const validations = (form) => {
	let errors = {};

	const regexMail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
	if (!regexMail.test(form.email)) {
		errors.email = "The email is invalid";
	}

	if (form.password.length < 8) {
		errors.password = "Password must be at least 8 characters long";
	}

    if (form.password.length === 0) {
		errors.password = "Please enter a password";
	}

	if (form.password !== form.confirmPassword) {
		errors.confirmPassword = "Passwords do not match";
	}

	return errors;
};

export default validations;
