import { AnyAction } from 'redux';
import { UserSignUpParams } from '../../types/auth';
import { CallBacks } from '../../types/main';

export const REQ_USER_LOGIN = 'auth/reqUserLogin';
export const SET_AUTHED_USER = 'auth/setAuthedUser';
export const CLEAR_AUTHED_USER = 'auth/clearAuthedUser';

export const REQ_USER_SIGN_UP = 'auth/reqUserSignUp';

export const CHECK_TOKEN = 'auth/checkToken';

const initialState: any = null;

export const authReducer = (state = initialState, action: AnyAction): any => {
  const { payload } = action;
  switch (action.type) {
    case SET_AUTHED_USER:
      return payload as any;
    case CLEAR_AUTHED_USER:
      return null;
    default:
      return state;
  }
};

export const reqUserLogin = (params: any, callbacks?: CallBacks) => ({
  type: REQ_USER_LOGIN,
  params,
  callbacks,
});

export const setAuthedUser = (payload: any, callbacks?: CallBacks) => ({
  type: SET_AUTHED_USER,
  payload,
  callbacks,
});

export const clearAuthedUser = () => ({
  type: CLEAR_AUTHED_USER,
});

export const signUp = (params: UserSignUpParams, callbacks?: CallBacks) => ({
  type: REQ_USER_SIGN_UP,
  params,
  callbacks,
});
