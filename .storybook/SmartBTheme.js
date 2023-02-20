import { create } from "@storybook/theming";
import logo from "../docs/public/smartb.png";

export default create({
  base: "light",
  brandTitle: "SmartB G2",
  brandUrl: "https://docs.smartb.city/g2",
  brandImage: logo,
  brandTarget: "_self",
  appBg: "#FFFEFB",
  fontBase: '"Montserrat", sans-serif',
  colorPrimary: "#353945",
  colorSecondary: "#353945",
});
