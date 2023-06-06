import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      height: {
        "1px": "1px",
      },
      colors: {
        primary: "var(--primary)",
        white: "var(--white)",
        black: "var(--black)",
        "black-200": "var(--black-200)",
        "black-500": "var(--black-500)",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        serif: ["Source Serif Pro", "serif"],
      },
    },
  },
};
