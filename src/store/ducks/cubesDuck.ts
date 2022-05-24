import { AnyAction } from 'redux';
import { CubesInitialState } from '../../types/cubes';

export const SET_SELECTED_CUBES = 'cubes/setSelectedCubes';

const initialState: CubesInitialState = {
  selectedCubes: [],
};

export const cubesReducer = (state = initialState, action: AnyAction): CubesInitialState => {
  const { payload } = action;
  switch (action.type) {
    case SET_SELECTED_CUBES:
      return {
        ...state,
        selectedCubes: [...payload as number[]],
      };
    default:
      return state;
  }
};

export const setSelectedCubes = (payload: number[]) => ({
  type: SET_SELECTED_CUBES,
  payload,
});
