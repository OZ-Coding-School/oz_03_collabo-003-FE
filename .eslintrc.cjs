module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:import/warnings",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
      }
    }
  },
  plugins: ["import",
  "react",
  "react-hooks",
  "react-refresh",
  "prettier",
  "tailwindcss"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/jsx-no-target-blank": "off",
    "no-unused-vars": "warn",
    "eqeqeq": ["error", "always"],
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-custom-classname": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
