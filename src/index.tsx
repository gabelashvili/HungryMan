import './index.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import rootSaga from './store/sagas';
import configureStore, { sagaMiddleware } from './store/configureStore';
import storeRegistry from './store/storeRegistry';

export const reduxStore = configureStore();

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

storeRegistry.register(reduxStore);
sagaMiddleware.run(() => rootSaga());

const persistor = persistStore(reduxStore);

root.render(
  <Provider store={reduxStore}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
