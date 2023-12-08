module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  overrides: [
    {
      files: ["*.tsx"],
      options: {
        parser: "typescript",
      },
    },
  ],
};