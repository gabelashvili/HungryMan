import { AnyAction } from 'redux';
import {
  AddAddressParams,
  AddressType,
  AuthedUser,
  UserReducerInitialState,
  UserAuthParams,
  UserSignUpParams,
  ReqProductsOrderHistory,
  ProductsOrderHistoryRes,
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
export const REMOVE_USER_ADDRESS = 'user/removeUserAddress';

export const GET_PRODUCTS_ORDER_HISTORY = 'user/getProductsOrderHistory';
export const SET_PRODUCTS_ORDER_HISTORY = 'user/setProductsOrderHistory';
export const CLEAR_PRODUCTS_ORDER_HISTORY = 'user/clearProductsOrderHistory';

const initialState: UserReducerInitialState = {
  user: null,
  addresses: null,
  productsOrderHistory: null,
};

export const userReducer = (state = initialState, action: AnyAction): UserReducerInitialState => {
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
    case SET_PRODUCTS_ORDER_HISTORY:
      return {
        ...state,
        productsOrderHistory: payload as ProductsOrderHistoryRes,
      };
    case CLEAR_PRODUCTS_ORDER_HISTORY:
      return {
        ...state,
        productsOrderHistory: null,
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

// address
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
export const clearUserAddresses = (callbacks?: CallBacks) => ({
  type: CLEAR_USER_ADDRESSES,
  callbacks,
});
export const removeUserAddress = (addressId: number, callbacks?: CallBacks) => ({
  type: REMOVE_USER_ADDRESS,
  addressId,
  callbacks,
});

// products order history
export const getProductsOrderHistory = (params: ReqProductsOrderHistory, callbacks?: CallBacks) => ({
  type: GET_PRODUCTS_ORDER_HISTORY,
  params,
  callbacks,
});
export const setProductsOrderHistory = (payload: ProductsOrderHistoryRes, callbacks?: CallBacks) => ({
  type: SET_PRODUCTS_ORDER_HISTORY,
  payload,
  callbacks,
});
export const clearProductsOrderHistory = (callbacks?: CallBacks) => ({
  type: CLEAR_PRODUCTS_ORDER_HISTORY,
  callbacks,
});
