import { initRedux } from "@smartb/g2-providers";

const reducers = {};

export const { store, history, reducer } = initRedux<typeof reducers>(reducers);

export type State = ReturnType<typeof reducer>;
