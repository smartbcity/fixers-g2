import { createSelector } from "reselect";
import { State } from "store";

const getExampleState = (state: State) => state.example;

export const getExample = createSelector(
  [getExampleState],
  (state) => state.example
);

export const selectors = {
  Example: getExample,
};
