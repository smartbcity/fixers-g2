import React from "react";
import { ThemeContextProvider } from "@smartb/g2-themes";
import { StorybookCanvas } from "../packages/storybook-documentation/src/StorybookCanvas";
import { getTheme, muiTheme } from "../docs/Theme/Theme";

import "./preview.css";

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
    <ThemeContextProvider customMuiTheme={muiTheme} theme={getTheme()}>
      <Story />
    </ThemeContextProvider>
  );
};

export const decorators = [withThemeProvider];
