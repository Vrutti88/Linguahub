/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      
        accent1: "var(--color-accent1)",
        accent2: "var(--color-accent2)",
        accent3: "var(--color-accent3)",
      
        bg: "var(--color-bg)",
        panel: "var(--color-panel)",
        softGlow: "var(--color-softGlow)",
      
        textPrimary: "var(--color-textPrimary)",
        textSecondary: "var(--color-textSecondary)",
        headerHighlight: "var(--color-headerHighlight)",
      },      
      backgroundImage: {
        "gradient-main":
          "linear-gradient(135deg, #41AEA9 0%, #A6F6F1 50%, #E8FFFF 100%)",
      
        "gradient-accent":
          "linear-gradient(135deg, #213E3B 0%, #41AEA9 50%, #A6F6F1 100%)",
      },
      
    },
  },
  plugins: [],
};
