/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        primary: '#3B82F6', // Electric blue
        secondary: '#D946EF', // Neon purple
        background: '#0D0D0D', // Deep space gray
        text: '#E5E5E5', // Light gray
        comment: '#6A9955', // Muted green (for hints or less prominent text)
        error: '#FF5370', // Bright red
        linkHover: '#FF61A6', // Cyan for link hover
        highlight: '#FF477E', // Nebula Pink
        borderFocus: '#FFC300', // Meteor Yellow
        buttonHover: '#39FF14', 
        info: '#60A5FA', // Sky Blue// Galactic Green
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
}