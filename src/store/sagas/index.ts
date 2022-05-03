import { all, takeLatest } from 'redux-saga/effects';
import {
  checkToken, logOut, reqPasswordRecover, reqUserLogin, setPassword, signUp, updateUserInfo, updateUserPassword,
} from './userSaga';
import {
  CHECK_TOKEN, LOG_OUT,
  REQ_PASSWORD_RECOVER,
  REQ_USER_LOGIN,
  REQ_USER_SIGN_UP,
  SET_PASSWORD,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
} from '../ducks/userDuck';
import { GET_FILTERED_PRODUCTS, GET_PRODUCTS } from '../ducks/productsDuck';
import { getFilteredProducts, getProducts } from './productsSaga';

function* actionWatcher() {
  // auth
  yield takeLatest(REQ_USER_LOGIN, reqUserLogin);
  yield takeLatest(REQ_USER_SIGN_UP, signUp);
  yield takeLatest(CHECK_TOKEN, checkToken);
  yield takeLatest(REQ_PASSWORD_RECOVER, reqPasswordRecover);
  yield takeLatest(SET_PASSWORD, setPassword);
  yield takeLatest(LOG_OUT, logOut);
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
  yield takeLatest(UPDATE_USER_PASSWORD, updateUserPassword);
  // products
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(GET_FILTERED_PRODUCTS, getFilteredProducts);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
