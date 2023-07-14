/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "40rem",
        130: "43.7rem",
        110: "37rem",
        105: "33rem",
        100: "30rem",
        101: "40rem",
        90: "25rem",
        85: "22.5rem",
        138: "45rem",
        140: "55rem",
        15: "",
      },
      width: {
        100: "30rem",
        110: "40rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
