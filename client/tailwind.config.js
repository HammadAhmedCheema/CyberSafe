/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563eb',
        'secondary-dark': '#0f172a',
        'accent-green': '#10b981',
        'bg-light': '#f8fafc',
        'bg-dark': '#0f172a',
        'text-dark': '#1e293b',
        'text-light': '#f8fafc',
      }
    },
  },
  plugins: [],
}