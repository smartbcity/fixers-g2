export const redux = `
const myReducers = {myReducer: myReducerObject}
const { store, history, reducer } = initRedux<typeof myReducers>(myReducers)

export type State = ReturnType<typeof reducer>;
...
  <AruiAppProvider
  reduxStore={store}
  history={history}
  >
`
