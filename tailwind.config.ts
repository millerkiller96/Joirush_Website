import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FFF6EB",
          deep: "#F3E0C8",
          paper: "#FFFAF3",
        },
        chocolate: {
          DEFAULT: "#2A1810",
          mid: "#5A3824",
          soft: "#8A5A38",
        },
        caramel: "#C4783A",
        pink: {
          DEFAULT: "#FF4B8B",
          hot: "#FF2D7A",
          blush: "#FFD6E5",
        },
        mint: "#6FDBB8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(42, 24, 16, 0.35)",
        lift: "0 28px 60px -28px rgba(255, 75, 139, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
