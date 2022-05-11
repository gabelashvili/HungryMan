import { AnyAction } from 'redux';

export const TOGGLE_MODAL = 'modals/toggleModal';

const initialState = {
  myAddress: false,
  addAddress: false,
};

export const modalsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  const { payload } = action;
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [payload as keyof typeof initialState]: !state[payload as keyof typeof initialState],
      };
    default:
      return state;
  }
};

export const toggleModal = (payload: keyof typeof initialState) => ({
  type: TOGGLE_MODAL,
  payload,
});
