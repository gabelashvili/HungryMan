import { AnyAction } from 'redux';
import { CubesInitialState } from '../../types/cubes';

export const SET_SELECTED_CUBES = 'cubes/setSelectedCubes';

const initialState: CubesInitialState = {
  selectedCubes: [
    2,
    3,
    4,
    5,
    6,
    26,
    46,
    45,
    44,
    64,
    84,
    85,
    86,
    87,
    88,
  ],
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
