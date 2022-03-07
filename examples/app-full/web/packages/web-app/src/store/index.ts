import { initRedux } from "@smartb/g2-providers";
import thunk from "redux-thunk";
import { refsReducer } from "./refs/refs.reducer";

const reducers = {
  refs: refsReducer,
};

export const { store, history, reducer } = initRedux<typeof reducers>(
  reducers,
  [thunk]
);

export type State = ReturnType<typeof reducer>;
