import React from "react";
import { ThemeContextProvider } from "@smartb/g2-themes";
import { StorybookCanvas } from "@smartb/g2-storybook-documentation";
import { G2ConfigBuilder, initI18next } from "../packages/providers/src";
import { I18nextProvider } from "react-i18next";

import "./default.css";
import { Box, CssBaseline, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

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
  viewMode: "docs",
};

G2ConfigBuilder({
  i2: {
    orgUrl: "https://dev.app.alveoleplus.fr/api",
    userUrl: "https://dev.app.alveoleplus.fr/api",
  },
  keycloak: {
    realm: "alveole-dev",
    clientId: "alveole-web",
    url: "https://dev.app.alveoleplus.fr/auth",
  },
  fs: {
    url: "http://51.83.34.130:8090",
  },
});

const i18n = initI18next({ en: "en-US", fr: "fr-FR" });

const permanentHeader = ({ toggleOpenDrawer }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        padding: "20px 16px",
      }}
    >
      <IconButton onClick={toggleOpenDrawer}>
        <Menu />
      </IconButton>
    </Box>
  );
};

export const withThemeProvider = (Story) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeContextProvider theme={{ permanentHeader }}>
        <CssBaseline />
        <Story />
      </ThemeContextProvider>
    </I18nextProvider>
  );
};

export const decorators = [withThemeProvider];
