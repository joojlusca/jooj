/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#070709", // Preto absoluto profundo
        accent: "#7B61FF",  // Roxo Plasma (Referência 2)
        accentGreen: "#00E5A3", // Verde Esmeralda (Referência 3)
        marfim: "#F5F3FF",  // Branco cristalino
        slateDark: "#1C1C26", 
        surface: "#0E0E15",  // Vidro escuro
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      }
    },
  },
  plugins: [],
}


