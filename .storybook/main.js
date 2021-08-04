module.exports = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../packages/components/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/documentation/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/forms/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/layout/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/s2/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/providers/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/webpack-components/src/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-controls",
    "storybook-addon-designs",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      savePropValueAsString: true,
      propFilter: (prop) => {
        if (!prop.parent) return false;
        if (prop.parent.name.includes("Basic")) {
          return true;
        }
        if (/node_modules/.test(prop.parent.fileName)) return false;
        return true;
      },
    },
  },
};
