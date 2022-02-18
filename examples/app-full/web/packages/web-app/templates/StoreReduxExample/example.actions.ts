import { createActionCreator } from "deox";

const setExample = createActionCreator(
  "EXAMPLE_SET",
  (resolve) => (example: Example) => resolve({ example: example })
);

export const actions = {
  set: setExample,
};
