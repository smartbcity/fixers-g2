import React from "react";
import { Theme } from "@smartb/g2-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ThemeGetterProps {
  myTheme: Theme;
}

const ThemeGetter = (props: ThemeGetterProps) => {
  const { myTheme } = props;
  const themeString = `const defaultTheme = {
    name: "${myTheme.name}",
    colors: { 
      primary: "${myTheme.colors.primary}",
      secondary: "${myTheme.colors.secondary}",
      tertiary: "${myTheme.colors.tertiary}",
      error: "${myTheme.colors.error}",
      success: "${myTheme.colors.success}",
      warning: "${myTheme.colors.warning}",,
      info: "${myTheme.colors.info}",
    }
    shadows: ["${myTheme.shadows[0]}",
    "${myTheme.shadows[1]}",
    "${myTheme.shadows[2]}",
    "${myTheme.shadows[3]}",
    "${myTheme.shadows[4]}",
    "${myTheme.shadows[5]}",
    "${myTheme.shadows[6]}",
    "${myTheme.shadows[7]}",
    "${myTheme.shadows[8]}",
    "${myTheme.shadows[9]}",
    "${myTheme.shadows[10]}",
    "${myTheme.shadows[11]}",
    "${myTheme.shadows[12]}"]
  }`;
  return (
    <SyntaxHighlighter language="typescript" style={tomorrow}>
      {themeString}
    </SyntaxHighlighter>
  );
};

export default ThemeGetter;
