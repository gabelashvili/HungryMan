import { AnyAction } from 'redux';
import { BuyCubesPayload, CubesInitialData, CubesInitialState } from '../../types/cubes';
import { CallBacks } from '../../types/main';

export const GET_INITIAL_DATA = 'cubes/getInitialData';
export const SET_INITIAL_DATA = 'cubes/setInitialData';
export const CLEAR_INITIAL_DATA = 'cubes/clearInitialData';
export const SET_SELECTED_CUBES = 'cubes/setSelectedCubes';
export const SET_TOTAL_PRICE = 'cubes/setTotalPrice';
export const BUY_CUBES = 'cubes/buyCubes';

const initialState: CubesInitialState = {
  selectedCubesInfo: null,
  initialData: null,
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
