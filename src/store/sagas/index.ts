import { all, takeLatest } from 'redux-saga/effects';
import {
  addUserAddress,
  checkToken, getUserAddresses, logOut, reqPasswordRecover, reqUserLogin, setPassword, signUp, updateUserInfo, updateUserPassword,
} from './userSaga';
import {
  ADD_USER_ADDRESS,
  CHECK_TOKEN, GET_USER_ADDRESSES, LOG_OUT,
  REMOVE_USER_ADDRESS,
  REQ_PASSWORD_RECOVER,
  REQ_USER_LOGIN,
  REQ_USER_SIGN_UP,
  SET_PASSWORD,
  UPDATE_USER_INFO,
  UPDATE_USER_PASSWORD,
} from '../ducks/userDuck';
import {
  GET_FILTERED_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT_DETAILS,
  PURCHASE_PRODUCT_CART_ITEMS,
  REQ_ADD_PRODUCT_IN_CART,
  REQ_REMOVE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_COUNT_IN_CART,
} from '../ducks/productsDuck';
import {
  getFilteredProducts,
  getProductDetails,
  getProducts,
  purchaseProductCartItems,
  removeUserAddress,
  reqAddProductInCart,
  reqRemoveProductFromCart,
  updateProductCountInCart,
} from './productsSaga';

function* actionWatcher() {
  // user
  yield takeLatest(REQ_USER_LOGIN, reqUserLogin);
  yield takeLatest(REQ_USER_SIGN_UP, signUp);
  yield takeLatest(CHECK_TOKEN, checkToken);
  yield takeLatest(REQ_PASSWORD_RECOVER, reqPasswordRecover);
  yield takeLatest(SET_PASSWORD, setPassword);
  yield takeLatest(LOG_OUT, logOut);
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
  yield takeLatest(UPDATE_USER_PASSWORD, updateUserPassword);
  yield takeLatest(GET_USER_ADDRESSES, getUserAddresses);
  // products
  yield takeLatest(GET_PRODUCTS, getProducts);
  yield takeLatest(GET_FILTERED_PRODUCTS, getFilteredProducts);
  yield takeLatest(GET_PRODUCT_DETAILS, getProductDetails);
  yield takeLatest(REQ_ADD_PRODUCT_IN_CART, reqAddProductInCart);
  yield takeLatest(REQ_REMOVE_PRODUCT_FROM_CART, reqRemoveProductFromCart);
  yield takeLatest(UPDATE_PRODUCT_COUNT_IN_CART, updateProductCountInCart);
  yield takeLatest(ADD_USER_ADDRESS, addUserAddress);
  yield takeLatest(REMOVE_USER_ADDRESS, removeUserAddress);
  yield takeLatest(PURCHASE_PRODUCT_CART_ITEMS, purchaseProductCartItems);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
