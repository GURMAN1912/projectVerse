/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F3B4D', // Electric blue
        secondary: '#7B2CBF', // Neon purple
        background: '#0D0D0D', // Deep space gray
        text: '#E5E5E5', // Light gray
        comment: '#6A9955', // Muted green (for hints or less prominent text)
        error: '#FF5370', // Bright red
        linkHover: '#80CBC4', // Cyan for link hover
        highlight: '#FF477E', // Nebula Pink
        borderFocus: '#FFC300', // Meteor Yellow
        buttonHover: '#39FF14', // Galactic Green
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
}