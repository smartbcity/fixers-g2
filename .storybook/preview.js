import React from "react";
import { ThemeContextProvider } from "@smartb/g2-themes";
import { StorybookCanvas } from "../packages/storybook-documentation/src/StorybookCanvas";

import "./default.css";

export const parameters = {
  docs: {
    container: StorybookCanvas,
    components: {
      Canvas: StorybookCanvas,
    },
  },
  options: {
    storySort: {
      order: [
        "Overview",
        ["Getting started", "Cheatsheet"],
        "Components",
        "Forms",
        "Layout",
      ],
    },
  },
};

export const withThemeProvider = (Story) => {
  return (
    <ThemeContextProvider>
      <Story />
    </ThemeContextProvider>
  );
};

export const decorators = [withThemeProvider];
