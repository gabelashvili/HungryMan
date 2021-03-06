import { AnyAction } from 'redux';
import {
  BuyCubesPayload, BuyCubesResponse, CubesInitialData, CubesInitialState,
  PurchaseInfo, PurchasesByPhoneNumberType, SoldCubesDetail,
} from '../../types/cubes';
import { CallBacks } from '../../types/main';

export const GET_INITIAL_DATA = 'cubes/getInitialData';
export const SET_INITIAL_DATA = 'cubes/setInitialData';
export const CLEAR_INITIAL_DATA = 'cubes/clearInitialData';

export const SET_SELECTED_CUBES_INFO = 'cubes/setSelectedCubesInfo';
export const BUY_CUBES = 'cubes/buyCubes';
export const SET_PURCHASE_DETAIL = 'cubes/setPurchaseDetail';

export const GET_CUBES_PURCHASE_HISTORY = 'cubes/getCubesPurchaseHistory';
export const SET_CUBES_PURCHASE_HISTORY = 'cubes/setCubesPurchaseHistory';
export const CLEAR_CUBES_PURCHASE_HISTORY = 'cubes/clearCubesPurchaseHistory';

export const SET_SOLD_CUBES_DETAILS = 'cubes/setSoldCubesDetails';

export const SET_PURCHASES_BY_PHONE_NUMBER = 'cubes/setPurchasesByPhoneNumber';

export const SET_PURCHASES_BY_PHONE_NUMBER_SEARCH_VALUE = 'cubes/setPurchasesByPhoneNumberSearchValue';

const initialState: CubesInitialState = {
  selectedCubesInfo: {
    cubesId: [],
    totalPrice: 0,
    enableComment: false,
    enableRedirectLink: false,
    base64: null,
  },
  initialData: null,
  purchaseHistory: null,
  soldCubesDetails: null,
  purchasesByPhoneNumber: null,
  searchVal: '',
  purchaseDetail: null,
};

export const cubesReducer = (state = initialState, action: AnyAction): CubesInitialState => {
  const { payload } = action;
  switch (action.type) {
    case SET_SELECTED_CUBES_INFO:
      return {
        ...state,
        selectedCubesInfo: {
          ...state.selectedCubesInfo,
          [payload.key as string]: payload.value,
        },
      };
    case SET_INITIAL_DATA:
      return {
        ...state,
        initialData: payload as CubesInitialData,
      };
    case CLEAR_INITIAL_DATA:
      return {
        ...state,
        initialData: null,
      };
    case SET_CUBES_PURCHASE_HISTORY:
      return {
        ...state,
        purchaseHistory: payload as PurchaseInfo[],
      };
    case CLEAR_CUBES_PURCHASE_HISTORY:
      return {
        ...state,
        purchaseHistory: null,
      };
    case SET_SOLD_CUBES_DETAILS:
      return {
        ...state,
        soldCubesDetails: payload as SoldCubesDetail,
      };
    case SET_PURCHASES_BY_PHONE_NUMBER:
      return {
        ...state,
        purchasesByPhoneNumber: payload as {[key:string]: PurchasesByPhoneNumberType[]},
      };
    case SET_PURCHASES_BY_PHONE_NUMBER_SEARCH_VALUE:
      return {
        ...state,
        searchVal: payload as string,
      };
    case SET_PURCHASE_DETAIL:
      return {
        ...state,
        purchaseDetail: payload as BuyCubesResponse,
      };
    default:
      return state;
  }
};

export const setSelectedCubesInfo = (payload: {
  key: 'cubesId' | 'enableComment' | 'enableRedirectLink' | 'totalPrice' | 'base64',
  value: number[] | boolean | number | string}) => ({
  type: SET_SELECTED_CUBES_INFO,
  payload,
});

export const buyCubes = (payload: BuyCubesPayload, callbacks?: CallBacks) => ({
  type: BUY_CUBES,
  payload,
  callbacks,
});

export const setPurchaseDetail = (payload: BuyCubesResponse, callbacks?: CallBacks) => ({
  type: SET_PURCHASE_DETAIL,
  payload,
  callbacks,
});

export const getInitialData = () => ({
  type: GET_INITIAL_DATA,
});

export const setInitialData = (payload: CubesInitialData) => ({
  type: SET_INITIAL_DATA,
  payload,
});

export const clearInitialData = () => ({
  type: CLEAR_INITIAL_DATA,
});

export const getCubesPurchaseHistory = () => ({
  type: GET_CUBES_PURCHASE_HISTORY,
});

export const setCubesPurchaseHistory = (payload: PurchaseInfo[]) => ({
  type: SET_CUBES_PURCHASE_HISTORY,
  payload,
});

export const clearCubesPurchaseHistory = () => ({
  type: CLEAR_CUBES_PURCHASE_HISTORY,
});

export const setSoldCubesDetail = (payload: SoldCubesDetail) => ({
  type: SET_SOLD_CUBES_DETAILS,
  payload,
});

export const setPurchasesByPhoneNumber = (payload: {[key:string]: PurchasesByPhoneNumberType[]}) => ({
  type: SET_PURCHASES_BY_PHONE_NUMBER,
  payload,
});

export const setSearchValue = (payload: string) => ({
  type: SET_PURCHASES_BY_PHONE_NUMBER_SEARCH_VALUE,
  payload,
});
