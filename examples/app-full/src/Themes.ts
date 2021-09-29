import { Theme as AruiTheme } from "@smartb/g2-themes";
import { StyleProps } from "@smartb/g2-layout";

export const appLayoutStyleProps: StyleProps = {
  appBarHeight: 55,
  detailDrawerWidth: 180,
  menuWidth: 180,
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const theme: DeepPartial<AruiTheme> = {
  name: "X2",
  colors: {
    primary: "some color",
    secondary: "some color",
  },
  shadows: [
    "0 0px 0px 0 rgba(0,0,0,0)",
    "0px 9px 18px 0px rgba(0,0,0,0.05)",
    "0px 11.25px 22.5px 0px rgba(0,0,0,0.07)",
    "0px 13.5px 27px 0px rgba(0,0,0,0.09)",
    "0px 15.75px 31.5px 0px rgba(0,0,0,0.11)",
    "0px 18px 36px 0px rgba(0,0,0,0.13)",
    "0px 20.25px 40.5px 0px rgba(0,0,0,0.15)",
    "0px 22.5px 45px 0px rgba(0,0,0,0.17)",
    "0px 24.75px 49.5px 0px rgba(0,0,0,0.19)",
    "0px 27px 54px 0px rgba(0,0,0,0.21)",
    "0px 29.25px 58.5px 0px rgba(0,0,0,0.23)",
    "0px 31.5px 63px 0px rgba(0,0,0,0.25)",
    "0px 33.75px 67.5px 0px rgba(0,0,0,0.27)",
  ],
};
