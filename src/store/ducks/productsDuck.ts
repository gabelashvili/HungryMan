import { AnyAction } from 'redux';

import { CallBacks } from '../../types/main';
import { GetProductsRequest, GetProductsResponse, ProductsInitialState } from '../../types/products';

export const GET_PRODUCTS = 'products/getProducts';
export const SET_PRODUCTS = 'products/setProducts';
export const CLEAR_PRODUCTS = 'products/clearProducts';

export const GET_FILTERED_PRODUCTS = 'products/getFilteredProducts';
export const SET_FILTERED_PRODUCTS = 'products/setFilteredProducts';

const initialState: ProductsInitialState = {
  productsList: null,
};

export const productsReducer = (state = initialState, action: AnyAction): ProductsInitialState => {
  const { payload } = action;
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productsList: payload as GetProductsResponse,
      };
    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        productsList: payload as GetProductsResponse,
      };
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

export const getFilteredProducts = (params: GetProductsRequest, callbacks?: CallBacks) => ({
  type: GET_FILTERED_PRODUCTS,
  params,
  callbacks,
});

export const setFilteredProducts = (payload: GetProductsResponse, callbacks?: CallBacks) => ({
  type: SET_FILTERED_PRODUCTS,
  payload,
  callbacks,
});
