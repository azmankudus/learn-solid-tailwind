import js from "@eslint/js";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  js.configs.recommended,
  ...tailwind.configs["flat/recommended"],
];
