import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e50914",
      },
      backgroundImage: {
        loginBg: "url('/images/loginBg.jpg')",
      },
      boxShadow: {
        'inner-upper': '0px 25px 50px 0px rgba(15,15,15,0.9) inset',
        'inner-upper-2xl': '0px 75px 50px 0px rgba(15,15,15,0.9) inset',
        'inner-lower': '0px -75px 50px 0px rgba(15,15,15,0.9) inset',
      },
    },
  },
  plugins: [],
};

export default config;
