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
          bg: '#FBF5DD',      // الخلفية الناعمة
          card: '#E7E1B1',    // البطاقات والتظليل
          primary: '#306D29', // الأخضر المريح للأزرار والعناوين
          dark: '#0D530E',    // الأخضر الداكن للنصوص
        }
      }
    },
  },
  plugins: [],
}