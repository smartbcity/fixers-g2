import { createActionCreator } from "deox";
import { OrganizationRef } from "@smartb/g2-i2";

const setOrganizationsRefs = createActionCreator(
  "SET_ORGNIZATIONS_REFS",
  (resolve) => (organizationsRefs: OrganizationRef[]) =>
    resolve({ organizationsRefs: organizationsRefs })
);

export const actions = {
  setOrganizationsRefs: setOrganizationsRefs,
};
