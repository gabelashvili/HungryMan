import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import { setFilteredProducts, setProductDetails, setProducts } from '../ducks/productsDuck';
import { GetProductsRequest, GetProductsResponse, ProductType } from '../../types/products';

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
