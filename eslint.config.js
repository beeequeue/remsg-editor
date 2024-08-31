import antfu from "@antfu/eslint-config"

export default antfu({
  stylistic: false,
  vue: {
    overrides: {
      "no-console": "off",
      "vue/block-order": ["error", { order: ["template", "script", "style"] }],
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
  test: { overrides: { "test/no-import-node-test": "off" } },
  typescript: {
    tsconfigPath: "tsconfig.json",
    overrides: {
      "no-console": "off",
      "ts/no-use-before-define": "off",
      "ts/consistent-type-definitions": "off",
      "ts/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "ts/no-unsafe-argument": "off",
      "ts/no-unsafe-assignment": "off",
    },
  },
})
