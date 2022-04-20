import { all, takeLatest } from 'redux-saga/effects';
import { checkToken, reqUserLogin, signUp } from './authSaga';
import { CHECK_TOKEN, REQ_USER_LOGIN, REQ_USER_SIGN_UP } from '../ducks/authDuck';

function* actionWatcher() {
  // auth
  yield takeLatest(REQ_USER_LOGIN, reqUserLogin);
  yield takeLatest(REQ_USER_SIGN_UP, signUp);
  yield takeLatest(CHECK_TOKEN, checkToken);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
