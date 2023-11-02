/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#232529", 
						foreground: "#EBD5C4", 
						primary: {
							foreground: "#EBD5C4",
							DEFAULT: "#3D1D93",
						},          
					},
				},
			},
		}),
	],
};
