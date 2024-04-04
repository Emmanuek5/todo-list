import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
      themes: [
        {
          mytheme: {
          
 "primary": "#00c0a3",
          
 "secondary": "#0087ff",
          
 "accent": "#9e6200",
          
 "neutral": "#271b1f",
          
"base-100": "#f1ffff",
          
 "info": "#00e3ff",
          
 "success": "#00ee9d",
          
 "warning": "#f09000",
          
 "error": "#e84e5e",
          },
        },
      ],
    },
  plugins: [require("daisyui")],
};
export default config;
