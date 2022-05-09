import { put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import {
  setFilteredProducts, setProductDetails, setProducts, setProductInCart,
} from '../ducks/productsDuck';
import {
  GetProductsRequest, GetProductsResponse, ProductType, SelectedProductType,
} from '../../types/products';
import { RootState } from '../..';

export function* getProducts({ params, callbacks }:{ params: GetProductsRequest, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: GetProductsResponse} = yield axiosInstance.get('/Item/Item/GetItems', { params });
    yield put(setProducts(data));
    callbacks?.success && callbacks.success(data.items);
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* getFilteredProducts({ params, callbacks }:
  { params: GetProductsRequest, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: GetProductsResponse} = yield axiosInstance.get('/Item/Item/GetItems', { params });
    yield put(setFilteredProducts(data));
    callbacks?.success && callbacks.success(data.items);
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* getProductDetails({ productId, callbacks }:{ productId: string, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: ProductType} = yield axiosInstance.get('/Item/Item/GetItemWithDetails/', { params: { id: productId } });
    yield put(setProductDetails(data));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* reqAddProductInCart({ product, callbacks }:
  { product: SelectedProductType, callbacks: CallBacks, type:string }) {
  try {
    const selectedProducts: SelectedProductType[] = yield select((state: RootState) => state
      .productsReducer.selectedProductsCart);

    const findIndexProductInCart = selectedProducts.findIndex((el) => el.product.id === product.product.id);

    if (findIndexProductInCart >= 0) {
      if (selectedProducts[findIndexProductInCart].count !== product.count) {
        const products = [...selectedProducts];
        products[findIndexProductInCart].count = product.count;
        yield put(setProductInCart(products));
      }
    } else {
      yield put(setProductInCart([product, ...selectedProducts]));
    }
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    console.log(error);
    callbacks?.error && callbacks.error();
  }
}

export function* reqRemoveProductFromCart({ productId, callbacks }:
  { productId: number, callbacks: CallBacks, type:string }) {
  try {
    const selectedProducts: SelectedProductType[] = yield select((state: RootState) => state
      .productsReducer.selectedProductsCart);
    const filteredData = selectedProducts.filter((el) => el.product.id !== productId);
    yield put(setProductInCart(filteredData));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
  }
}
