import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        neonPink: '#ff0080',
        neonBlue: "var(--neon-text)",
      },
    },
  },
  plugins: [
   
    plugin(function ({ addUtilities }) {
      const newUtilities ={
        '.text-neon': {
          textShadow: '0 0 5px #ff0080, 0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 40px #ff0080',
        },
        '.text-neon-blue': {
          textShadow: '0 0 5px var(--neon-text) , 0 0 5px var(--neon-text), 0 0 10px var(--neon-text), 0 0 1px var(--neon-text)',
        },
      };
      addUtilities(newUtilities)
    }),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;
