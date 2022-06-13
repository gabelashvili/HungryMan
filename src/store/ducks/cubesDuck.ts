import { AnyAction } from 'redux';
import {
  BuyCubesPayload, CubesInitialData, CubesInitialState, PurchaseInfo, SoldCubesDetail,
} from '../../types/cubes';
import { CallBacks } from '../../types/main';

export const GET_INITIAL_DATA = 'cubes/getInitialData';
export const SET_INITIAL_DATA = 'cubes/setInitialData';
export const CLEAR_INITIAL_DATA = 'cubes/clearInitialData';

export const SET_SELECTED_CUBES = 'cubes/setSelectedCubes';
export const SET_TOTAL_PRICE = 'cubes/setTotalPrice';
export const SET_BASE64 = 'cubes/setBase64';
export const BUY_CUBES = 'cubes/buyCubes';

export const GET_CUBES_PURCHASE_HISTORY = 'cubes/getCubesPurchaseHistory';
export const SET_CUBES_PURCHASE_HISTORY = 'cubes/setCubesPurchaseHistory';
export const CLEAR_CUBES_PURCHASE_HISTORY = 'cubes/clearCubesPurchaseHistory';

export const SET_SOLD_CUBES_DETAILS = 'cubes/setSoldCubesDetails';

const initialState: CubesInitialState = {
  selectedCubesInfo: {
    cubesId: [],
  },
  initialData: null,
  purchaseHistory: null,
  soldCubesDetails: null,
};

export const cubesReducer = (state = initialState, action: AnyAction): CubesInitialState => {
  const { payload } = action;
  switch (action.type) {
    case SET_SELECTED_CUBES:
      return {
        ...state,
        selectedCubesInfo: {
          ...state.selectedCubesInfo,
          cubesId: [...payload as number[]],
        },
      };
    case SET_TOTAL_PRICE:
      return {
        ...state,
        selectedCubesInfo: {
          ...state.selectedCubesInfo,
          totalPrice: payload as number,
        },
      };
    case SET_BASE64:
      return {
        ...state,
        selectedCubesInfo: {
          ...state.selectedCubesInfo,
          base64: payload as string,
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
    default:
      return state;
  }
};

export const setSelectedCubes = (payload: number[]) => ({
  type: SET_SELECTED_CUBES,
  payload,
});

export const setTotalPriceInStore = (payload: number) => ({
  type: SET_TOTAL_PRICE,
  payload,
});

export const setBase64 = (payload: string) => ({
  type: SET_BASE64,
  payload,
});

export const buyCubes = (payload: BuyCubesPayload, callbacks?: CallBacks) => ({
  type: BUY_CUBES,
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
