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
    "0px 4px 8px rgba(0, 0, 0, 0.2)",
    "0px 5px 12px rgba(0, 0, 0, 0.21)",
    "0px 6px 16px rgba(0, 0, 0, 0.22)",
    "0px 7px 20px rgba(0, 0, 0, 0.23)",
    "0px 8px 24px rgba(0, 0, 0, 0.24)",
    "0px 9px 28px rgba(0, 0, 0, 0.25)",
    "0px 10px 32px rgba(0, 0, 0, 0.26)",
    "0px 11px 36px rgba(0, 0, 0, 0.27)",
    "0px 12px 40px rgba(0, 0, 0, 0.28)",
    "0px 13px 44px rgba(0, 0, 0, 0.29)",
    "0px 14px 48px rgba(0, 0, 0, 0.3)",
    "0px 15px 52px rgba(0, 0, 0, 0.31)",
  ],
};
