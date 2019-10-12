const {strictEslint} = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    "object-curly-spacing": "off",
    quotes: "off",
    "react/destructuring-assignment": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/sort-comp": "off",
    "object-curly-newline": "off",
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "no-plusplus": "off",
    "react/no-array-index-key": "off",
    "react/no-unescaped-entities": "off",
    "max-len": "off",
    "comma-dangle": "off",
    "default-case": "off",
    "prefer-destructuring": "off",
    "react/no-unused-state": "off",
    eqeqeq: "off",
    "no-unused-expressions": "off",
    "react/no-access-state-in-setstate": "off",
    "react/jsx-no-bind": "off",
    "no-debugger": "off",
    "react/jsx-no-target-blank": "off",
  }
};
