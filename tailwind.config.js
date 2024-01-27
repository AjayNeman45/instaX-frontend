const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/button.js",
	],
	theme: {
		extend: {},
		screens: {
			btnbg: "var(--btn-bg)",
		},
	},
	darkMode: "class",
	plugins: [nextui()],
}

