import { all, takeLatest } from 'redux-saga/effects';
import {
  checkToken, reqPasswordRecover, reqUserLogin, setPassword, signUp,
} from './authSaga';
import {
  CHECK_TOKEN, REQ_PASSWORD_RECOVER, REQ_USER_LOGIN, REQ_USER_SIGN_UP, SET_PASSWORD,
} from '../ducks/authDuck';

function* actionWatcher() {
  // auth
  yield takeLatest(REQ_USER_LOGIN, reqUserLogin);
  yield takeLatest(REQ_USER_SIGN_UP, signUp);
  yield takeLatest(CHECK_TOKEN, checkToken);
  yield takeLatest(REQ_PASSWORD_RECOVER, reqPasswordRecover);
  yield takeLatest(SET_PASSWORD, setPassword);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
