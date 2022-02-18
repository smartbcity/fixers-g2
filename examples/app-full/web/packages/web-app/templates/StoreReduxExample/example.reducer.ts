import { createReducer } from "deox";
import { actions } from "./example.actions";

export interface ExampleState {
  example: Example;
}

export const initialState: ExampleState = {
  example: "ColisActiv'",
};

const setexample = (example: Example, state: ExampleState): ExampleState => {
  return { ...state, example: example };
};

export const exampleReducer = createReducer(initialState, (handleAction) => [
  handleAction(actions.set, (state: ExampleState, action) =>
    setexample(action.payload.example, state)
  ),
]);
