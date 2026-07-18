/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo Blue
        secondary: "#06B6D4", // Cyan/Teal
        accent: "#A78BFA", // Soft Violet
        background: "#FFFFFF",
        surface: "#F8FAFC", // Off-white
        text: {
          heading: "#1E293B", // Slate
          body: "#475569", // Slate
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(0, 0, 0, 0.05)",
        "soft-lg": "0 20px 50px -15px rgba(0, 0, 0, 0.05)",
        "glow-primary": "0 0 20px rgba(79, 70, 229, 0.4)",
        "glow-secondary": "0 0 20px rgba(6, 182, 212, 0.4)",
        "premium-card": "0 10px 40px -10px rgba(0,0,0,0.03), 0 0 20px rgba(79,70,229,0.05) inset",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
