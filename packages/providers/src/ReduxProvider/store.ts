import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  Reducer,
  AnyAction
} from 'redux'

/**
 * initiliaze the instance of the redux store
 * @param {Reducers extends { [key: string]: Reducer<any, AnyAction> }}  reducers - an object containing the reducers you want to insert in your store like that: `{myReducer: myReducerObject}`
 * @param {Middleware<{}, any, any>[]}  middlewares - An array containing the possible middlewares you want to add to your store
 * @return {Store} Return the redux store instance
 */
export const initRedux = <
  Reducers extends { [key: string]: Reducer<any, AnyAction> } = {}
>(
  reducers?: Reducers,
  middlewares?: Middleware<{}, any, any>[]
) => {
  middlewares = middlewares ?? []

  const reducersCombination: Reducers = reducers ?? ({} as Reducers)

  const reducer =
    combineReducers<typeof reducersCombination>(reducersCombination)

  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(...middlewares))
  )
  return { store: store, reducer: reducer }
}

export default initRedux
