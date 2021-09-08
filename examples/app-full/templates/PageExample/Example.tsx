import React from "react";
import { useTheme } from "@smartb/g2-components";
import { highLevelStyles } from "utils";
import { useTranslation } from "react-i18next";

const useStyles = highLevelStyles({});

interface ExampleProps {}

export const Example = (props: ExampleProps) => {
  const {} = props;
  const theme = useTheme
  const {t} = useTranslation()
  const classes = useStyles();
  return <div></div>;
};
