import { AnyAction } from 'redux';

import { CallBacks } from '../../types/main';
import { GetProductsRequest, GetProductsResponse, ProductsInitialState } from '../../types/products';

export const GET_PRODUCTS = 'products/getProducts';
export const SET_PRODUCTS = 'products/setProducts';
export const CLEAR_PRODUCTS = 'products/clearProducts';

const initialState: ProductsInitialState = {
  productsList: null,
};

export const productsReducer = (state = initialState, action: AnyAction): ProductsInitialState => {
  const { payload } = action;
  switch (action.type) {
    case SET_PRODUCTS: {
      const data = payload as GetProductsResponse;
      return {
        ...state,
        productsList: {
          ...data,
          items: state.productsList?.items ? [...state.productsList.items, ...data.items] : data.items,
        },
      };
    }
    case CLEAR_PRODUCTS:
      return {
        ...state,
        productsList: null,
      };
    default:
      return state;
  }
};

export const getProducts = (params: GetProductsRequest, callbacks?: CallBacks) => ({
  type: GET_PRODUCTS,
  params,
  callbacks,
});

export const setProducts = (payload: GetProductsResponse, callbacks?: CallBacks) => ({
  type: SET_PRODUCTS,
  payload,
  callbacks,
});

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS,
});
