import {
  applyMiddleware, combineReducers, createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  authReducer, 
} from './ducks';

export const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers({
  authReducer,

});

export type RootState = ReturnType<typeof appReducer>;

export default function configureStore() {
  const middlewares = [sagaMiddleware];

  const store = createStore(appReducer, {}, composeWithDevTools(
    applyMiddleware(...middlewares),
  ));

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./ducks', () => store.replaceReducer(appReducer));
  }

  return store;
}
