module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb-typescript",
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["simple-import-sort"],
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
  rules: {
    "max-len": [
      2,
      {
        code: 85,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
      },
    ],
    "arrow-parens": ["error", "always"],
    "prefer-destructuring": 0,
    "operator-linebreak": 0,
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "object-curly-newline": "off",
    "newline-per-chained-call": "off",
    "no-console": 0,
    "no-restricted-syntax": 0,
    eqeqeq: 0,
    "consistent-return": 1,
    "no-await-in-loop": 1,
    "no-param-reassign": 0,
    "linebreak-style": 0,

    "default-param-last": "off",
    "no-plusplus": "off",
    "lines-between-class-members": "off",
    "class-methods-use-this": "off",

    "no-underscore-dangle": "off",
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "no-use-before-define": 0,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/lines-between-class-members": "off",

    "@typescript-eslint/default-param-last": "off",
    "@typescript-eslint/no-plusplus": "off",
    "@typescript-eslint/naming-convention": "off",

    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": 0,

    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
  },
};
