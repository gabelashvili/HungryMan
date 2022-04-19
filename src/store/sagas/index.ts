import { all, takeLatest } from 'redux-saga/effects';
import { checkToken, reqUserLogin } from './authSaga';
import { CHECK_TOKEN, REQ_USER_LOGIN } from '../ducks/authDuck';


function* actionWatcher() {
  // auth
  yield takeLatest(REQ_USER_LOGIN, reqUserLogin);
  yield takeLatest(CHECK_TOKEN, checkToken);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}