/* eslint-disable import/no-anonymous-default-export */
import { Store } from 'redux';

let reduxStore: Store;
export default {
  register: (store: Store) => {
    reduxStore = store;
  },
  getStore: () => reduxStore,
};
