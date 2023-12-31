export const createClientValidations = (form) => {
	let error = {};

	if (form.name.length === 0) error.name = "Please enter a name";

	if (form.name.includes(" ")) error.name = "Name can't have spaces";

	if (form.lastName.length === 0) error.lastName = "Please enter a last name";

	if (form.igUsername[0] !== "@")
		error.igUsername = "Instagram username must start with @";

	if (form.igUsername.length <= 3)
		error.igUsername = "Username must be at least 3 characters long";

	if (form.igUsername.includes(" "))
		error.igUsername = "Username can't have spaces";

	if (form.city.length === 0) error.city = "Please enter a city";

	if (form.neighborhood.length === 0)
		error.neighborhood = "Please enter a neighborhood";

	if (form.adress.length === 0) error.adress = "Please enter an adress";

	return error;
};
