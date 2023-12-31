export const passwordValidations = (loginData) => {
	let passwordErrors = {};

	if (loginData.newPassword.length < 8)
		passwordErrors.newPassword = "Password must be at least 8 charactes long";

	if (loginData.newPassword !== loginData.confirmNewPassword)
		passwordErrors.confirmNewPassword = "Passwords don't match";
	return passwordErrors;
};
