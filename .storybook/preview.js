import React from "react";
import {
  ThemeContextProvider,
  defaultMaterialUiTheme,
} from "@smartb/g2-themes";
import { StorybookCanvas } from "../packages/storybook-documentation/src/StorybookCanvas";
import { getTheme } from "../docs/Theme/Theme";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

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
    <EmotionThemeProvider theme={defaultMaterialUiTheme(getTheme())}>
      <ThemeContextProvider theme={getTheme()}>
        <Story />
      </ThemeContextProvider>
    </EmotionThemeProvider>
  );
};

export const decorators = [withThemeProvider];
