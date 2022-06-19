import { AnyAction } from 'redux';

export const TOGGLE_CART_MODAL = 'cart/toggleCartModal';

const initialState: boolean = false;

export const cartModalReducer = (state = initialState, action: AnyAction): boolean => {
  switch (action.type) {
    case TOGGLE_CART_MODAL:
      return !state;
    default:
      return state;
  }
};

export const toggleCartModal = () => ({
  type: TOGGLE_CART_MODAL,
});
