/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maladh: {
          primary: '#A99BD8',   // Soft Purple - Primary accent
          primaryDark: '#9383C7', // Darker Purple
          bg: '#FBFAF8',        // Soft off-white background
          bgAlt: '#EEF5F7',     // Alternate light background
          text: '#293E5E',      // Dark Slate Blue - Primary text
          textMuted: '#64748B', // Muted text
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(169, 155, 216, 0.1), 0 10px 20px -2px rgba(169, 155, 216, 0.04)',
        'card': '0 4px 20px -2px rgba(169, 155, 216, 0.08)',
      }
    },
  },
  plugins: [],
}