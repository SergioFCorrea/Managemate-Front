export const newEmailValidations = (newEmail) => {
	let errors = {};

	const regexMail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

	if (!regexMail.test(newEmail.newEmail)) {
		errors.newEmail = "Invalid e-mail";
	}

	return errors;
};
