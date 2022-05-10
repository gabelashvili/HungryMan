import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CallBacks } from '../../types/main';
import {
  GetProductsRequest, GetProductsResponse, ProductsInitialState, ProductType, SelectedProductType,
} from '../../types/products';

export const GET_PRODUCTS = 'products/getProducts';
export const SET_PRODUCTS = 'products/setProducts';
export const CLEAR_PRODUCTS = 'products/clearProducts';

export const GET_FILTERED_PRODUCTS = 'products/getFilteredProducts';
export const SET_FILTERED_PRODUCTS = 'products/setFilteredProducts';

export const GET_PRODUCT_DETAILS = 'products/getProductDetails';
export const SET_PRODUCT_DETAILS = 'products/setProductDetails';
export const CLEAR_PRODUCT_DETAILS = 'products/clearProductDetails';

export const REQ_ADD_PRODUCT_IN_CART = 'products/reqAddProductInCart';
export const SET_PRODUCTS_IN_CART = 'products/setProductSInCart';
export const REQ_REMOVE_PRODUCT_FROM_CART = 'products/reqRemoveProductFromCart';
export const UPDATE_PRODUCT_COUNT_IN_CART = 'products/updateProductCountInCart';
export const CLEAR_PRODUCT_CART = 'products/clearProductCart';

const initialState: ProductsInitialState = {
  productsList: null,
  productDetails: null,
  selectedProductsCart: [],
};

const productsReducer = (state = initialState, action: AnyAction): ProductsInitialState => {
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
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: payload as ProductType,
      };
    case CLEAR_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: null,
      };
    case SET_PRODUCTS_IN_CART:
      return {
        ...state,
        selectedProductsCart: payload as SelectedProductType[],
      };
    case CLEAR_PRODUCT_CART:
      return {
        ...state,
        selectedProductsCart: [],
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'productsReducer',
  storage,
  whitelist: ['selectedProductsCart'],
};

export const persistProductsReducer = persistReducer(persistConfig, productsReducer);

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

export const getProductDetails = (productId: number, callbacks?: CallBacks) => ({
  type: GET_PRODUCT_DETAILS,
  productId,
  callbacks,
});

export const setProductDetails = (payload: ProductType, callbacks?: CallBacks) => ({
  type: SET_PRODUCT_DETAILS,
  payload,
  callbacks,
});

export const clearProductDetails = () => ({
  type: CLEAR_PRODUCT_DETAILS,
});

// products cart
export const reqAddProductInCart = (product: SelectedProductType, callbacks?: CallBacks) => ({
  type: REQ_ADD_PRODUCT_IN_CART,
  product,
  callbacks,
});

export const setProductInCart = (payload: SelectedProductType[], callbacks?: CallBacks) => ({
  type: SET_PRODUCTS_IN_CART,
  payload,
  callbacks,
});

export const reqRemoveProductFromCart = (productId: number, callbacks?: CallBacks) => ({
  type: REQ_REMOVE_PRODUCT_FROM_CART,
  productId,
  callbacks,
});

export const clearProductCart = () => ({
  type: CLEAR_PRODUCT_CART,
});

export const updateProductCountInCart = (id: number, value: number, callbacks?: CallBacks) => ({
  type: UPDATE_PRODUCT_COUNT_IN_CART,
  id,
  value,
  callbacks,
});
