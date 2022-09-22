import React from "react";
import { ThemeContextProvider } from "@smartb/g2-themes";
import { StorybookCanvas } from "../packages/storybook-documentation/src/StorybookCanvas";
import { G2ConfigBuilder } from "../packages/providers/src";

import "./default.css";
import { CssBaseline } from "@mui/material";

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

G2ConfigBuilder({
  i2: {
    orgUrl: "https://dev.app.alveoleplus.fr/im",
    userUrl: "https://dev.app.alveoleplus.fr/im", 
  },
  keycloak: {
    realm: "alveole-dev",
    clientId: "alveole-web",
    url: "https://auth.smart-b.io/auth"
  },
  fs: {
    url: "http://51.83.34.130:8090",
  }
});

export const withThemeProvider = (Story) => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Story />
    </ThemeContextProvider>
  );
};

export const decorators = [withThemeProvider];
