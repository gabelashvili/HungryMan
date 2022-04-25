import { AnyAction } from 'redux';
import {
  AuthedUser, AuthInitialState, UserAuthParams, UserSignUpParams,
} from '../../types/user';
import { CallBacks } from '../../types/main';

export const REQ_USER_LOGIN = 'user/reqUserLogin';
export const SET_AUTHED_USER = 'user/setAuthedUser';
export const CLEAR_AUTHED_USER = 'user/clearAuthedUser';

export const REQ_USER_SIGN_UP = 'user/reqUserSignUp';

export const CHECK_TOKEN = 'user/checkToken';

export const REQ_PASSWORD_RECOVER = 'user/reqPasswordRecover';
export const SET_PASSWORD = 'user/setPassword';

export const LOG_OUT = 'user/logOut';

export const UPDATE_USER_INFO = 'user/updateUserInfo';

const initialState: AuthInitialState = {
  user: null,
};

export const userReducer = (state = initialState, action: AnyAction): AuthInitialState => {
  const { payload } = action;
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        user: payload as AuthedUser,
      };
    case CLEAR_AUTHED_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const signIn = (params: UserAuthParams, callbacks?: CallBacks) => ({
  type: REQ_USER_LOGIN,
  params,
  callbacks,
});

export const setAuthedUser = (payload: AuthedUser, callbacks?: CallBacks) => ({
  type: SET_AUTHED_USER,
  payload,
  callbacks,
});

export const clearAuthedUser = () => ({
  type: CLEAR_AUTHED_USER,
});

export const checkToken = (callbacks?: CallBacks) => ({
  type: CHECK_TOKEN,
  callbacks,
});

export const signUp = (params: UserSignUpParams, callbacks?: CallBacks) => ({
  type: REQ_USER_SIGN_UP,
  params,
  callbacks,
});

export const reqPasswordRecover = (phoneOrEmail: string, callbacks?: CallBacks) => ({
  type: REQ_PASSWORD_RECOVER,
  phoneOrEmail,
  callbacks,
});

export const setPassword = (password: string, token: string, callbacks?: CallBacks) => ({
  type: SET_PASSWORD,
  password,
  token,
  callbacks,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const updateUserInfo = (params: any, callbacks?: CallBacks) => ({
  type: UPDATE_USER_INFO,
  params,
  callbacks,
});
