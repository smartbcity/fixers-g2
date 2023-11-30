import { dirname, join } from "path";
import remarkGfm from "remark-gfm";
module.exports = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../packages/components/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/composable/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/documentation/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/forms/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/layout/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/notifications/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/s2/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/providers/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/webpack-components/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/i2/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/i2-v2/src/**/*.stories.@(ts|tsx|mdx)",
    "../packages/fs/src/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        transcludeMarkdown: true,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    getAbsolutePath("@storybook/addon-controls"),
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
  staticDirs: ["./public"],
  features: {
    emotionAlias: false,
    buildStoriesJson: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
