module.exports = {
  root: true,
  overrides: [
    {
      files: ["client/**/*.js", "client/**/*.jsx"],
      extends: ["eslint:recommended", "plugin:react/recommended"],
      rules: {
        "react/prop-types": "off",
      },
    },
    {
      files: ["server/**/*.js"],
      extends: ["eslint:recommended", "plugin:node/recommended"],
    },
  ],
};
