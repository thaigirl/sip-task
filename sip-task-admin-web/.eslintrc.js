const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    "object-curly-spacing": "off",
    quotes: "off",
    "react/destructuring-assignment":"off",
    "import/no-unresolved":"off",
    "@typescript-eslint/explicit-member-accessibility":"off",
    "jsx-a11y/anchor-is-valid":"off",
    "jsx-a11y/click-events-have-key-events":"off",
    "jsx-a11y/no-static-element-interactions":"off",
    "react/sort-comp":"off",
    "object-curly-newline": "off",
    "no-param-reassign": "off",
  }
};
