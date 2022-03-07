import { selectors } from "./router.selectors";
import { goto } from "./router.goto";
import { gotoAditionalModules } from "./routerAditionnal.goto";

export const router = {
  actions: selectors,
  goto: goto,
  gotoAditionalModules: gotoAditionalModules,
};
