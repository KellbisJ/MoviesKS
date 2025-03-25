/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'pulse-slow': 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
				'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
				'particle-float': 'particle-float 1.8s ease-out infinite',
			},
			keyframes: {
				'particle-float': {
					'0%': {
						opacity: 1,
						transform: 'translate(0, 0) scale(1) rotate(0deg)',
					},
					'100%': {
						opacity: 0,
						transform: 'translate(var(--tx), var(--ty)) scale(0) rotate(360deg)',
					},
				},
			},
		},
	},
	plugins: [],
};
