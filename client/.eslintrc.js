module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: ["standard-with-typescript", "plugin:prettier/recommended"],
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "tsconfig.json",
      tsconfigRootDir: __dirname,
   },
   rules: {
      "no-console": "warn",
      indent: "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "no-empty-pattern": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-throw-literal": "off",
   },
};
