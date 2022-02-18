import { State } from "../index";
import { createSelector } from "reselect";

const getState = (state: State) => state.router;

const getCurrentLocation = createSelector(
  [getState],
  (state) => state.location
);

export const selectors = {
  getCurrentLocation: getCurrentLocation,
};
