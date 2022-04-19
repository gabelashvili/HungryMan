import './index.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import rootSaga from './store/sagas';
import configureStore, { sagaMiddleware } from './store/configureStore';
import storeRegistry from './store/storeRegistry';

export const reduxStore = configureStore();
const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

storeRegistry.register(reduxStore);
sagaMiddleware.run(() => rootSaga());

root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
