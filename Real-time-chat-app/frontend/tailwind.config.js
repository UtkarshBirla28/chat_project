/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				chatterbox: {
					primary: "#7c6cf5",
					"primary-content": "#ffffff",
					secondary: "#22d3ee",
					"secondary-content": "#06202a",
					accent: "#c084fc",
					"accent-content": "#1a0b2e",
					neutral: "#1c172e",
					"neutral-content": "#d7d3e8",
					"base-100": "#1a1530",
					"base-200": "#15112a",
					"base-300": "#100d22",
					"base-content": "#e8e6f0",
					info: "#38bdf8",
					success: "#34d399",
					warning: "#fbbf24",
					error: "#fb7185",
					"--rounded-box": "1rem",
					"--rounded-btn": "0.6rem",
				},
			},
		],
		darkTheme: "chatterbox",
	},
};
