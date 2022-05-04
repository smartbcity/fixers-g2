import React from "react";
import { ThemeContextProvider } from "@smartb/g2-themes";
import { StorybookCanvas } from "../packages/storybook-documentation/src/StorybookCanvas";
import { G2ConfigBuilder } from "../packages/providers/src";

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

G2ConfigBuilder({
  i2: {
    orgUrl: "http://localhost:8002",
    userUrl: "http://localhost:8002",
  },
  fs: {
    url: "http://51.83.34.130:8090",
  },
  keycloak: {
    clientId: "admin-cli",
    realm: "test",
    url: "https://auth.smart-b.io/auth",
  },
});

export const withThemeProvider = (Story) => {
  return (
    <ThemeContextProvider>
      <Story />
    </ThemeContextProvider>
  );
};

export const decorators = [withThemeProvider];
