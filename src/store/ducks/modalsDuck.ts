import { AnyAction } from 'redux';

export const TOGGLE_MODAL = 'modals/toggleModal';

const initialState = {
  myAddressList: {
    open: false,
    payload: null,
  },
  addAddress: {
    open: false,
    payload: null,
  },
};

export const modalsReducer = (state = initialState, action: AnyAction): typeof initialState => {
  const { payload } = action;
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [payload.key as keyof typeof initialState]: {
          open: payload.open,
          payload: payload?.payload || state[payload.key as keyof typeof initialState].payload || null,
        },
      };
    default:
      return state;
  }
};

export const toggleModal = (payload: {key: keyof typeof initialState, open: boolean, payload?: any}) => ({
  type: TOGGLE_MODAL,
  payload,
});
