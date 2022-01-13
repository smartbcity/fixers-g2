import { selectors } from "./router.selectors";
import { goto } from "./router.goto";

export const router = {
  actions: selectors,
  goto: goto,
};
