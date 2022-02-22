import { createSelector } from "reselect";
import { State } from "..";

const getRefsState = (state: State) => state.refs;

export const getOrganizationsRefs = createSelector(
  [getRefsState],
  (state) => state.organizationsRefs
);

export const selectors = {
  organizationsRefs: getOrganizationsRefs,
};
