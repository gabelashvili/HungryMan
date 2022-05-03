import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import { setProducts } from '../ducks/productsDuck';
import { GetProductsRequest, GetProductsResponse } from '../../types/products';

export function* getProducts({ params, callbacks }:{ params: GetProductsRequest, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: GetProductsResponse} = yield axiosInstance.get('/Item/Item/GetItems', { params });
    yield put(setProducts(data));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}
