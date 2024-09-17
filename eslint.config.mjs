import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {ignores: ["**/*.json", "**/*.scss", "**/*.css", "**/*.csv", "**/*.txt", "src/tests", "src/style.css.d.ts"]},
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {settings: {react:{version:"detect"}}},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];