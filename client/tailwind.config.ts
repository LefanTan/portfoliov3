import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        white: "var(--white)",
        black: "var(--black)",
        "black-200": "var(--black-200)",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        serif: ["Source Serif Pro", "serif"],
      },
    },
  },
};
