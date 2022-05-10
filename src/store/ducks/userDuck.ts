import { AnyAction } from 'redux';
import {
  AddAddressParams,
  AddressType,
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

export const UPDATE_USER_PASSWORD = 'user/updateUserPassword';

export const GET_USER_ADDRESSES = 'user/getUserAddresses';
export const SET_USER_ADDRESSES = 'user/setUserAddresses';
export const CLEAR_USER_ADDRESSES = 'user/clearUserAddresses';
export const ADD_USER_ADDRESS = 'user/addUserAddress';

const initialState: AuthInitialState = {
  user: null,
  addresses: null,
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
    case SET_USER_ADDRESSES:
      return {
        ...state,
        addresses: payload as AddressType[],
      };
    case CLEAR_USER_ADDRESSES:
      return {
        ...state,
        addresses: null,
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

export const updateUserPassword = (params: {oldPassword:string, password:string}, callbacks?: CallBacks) => ({
  type: UPDATE_USER_PASSWORD,
  params,
  callbacks,
});

export const getUserAddresses = (userId: number, callbacks?: CallBacks) => ({
  type: GET_USER_ADDRESSES,
  userId,
  callbacks,
});

export const setUserAddresses = (payload: AddressType[], callbacks?: CallBacks) => ({
  type: SET_USER_ADDRESSES,
  payload,
  callbacks,
});

export const addUserAddress = (params: AddAddressParams, callbacks?: CallBacks) => ({
  type: ADD_USER_ADDRESS,
  params,
  callbacks,
});
