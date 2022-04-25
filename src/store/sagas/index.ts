import { all, takeLatest } from 'redux-saga/effects';
import {
  checkToken, logOut, reqPasswordRecover, reqUserLogin, setPassword, signUp, updateUserInfo,
} from './authSaga';
import {
  CHECK_TOKEN, LOG_OUT, REQ_PASSWORD_RECOVER, REQ_USER_LOGIN, REQ_USER_SIGN_UP, SET_PASSWORD, UPDATE_USER_INFO,
} from '../ducks/userDuck';

function* actionWatcher() {
  // auth
  yield takeLatest(REQ_USER_LOGIN, reqUserLogin);
  yield takeLatest(REQ_USER_SIGN_UP, signUp);
  yield takeLatest(CHECK_TOKEN, checkToken);
  yield takeLatest(REQ_PASSWORD_RECOVER, reqPasswordRecover);
  yield takeLatest(SET_PASSWORD, setPassword);
  yield takeLatest(LOG_OUT, logOut);
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
