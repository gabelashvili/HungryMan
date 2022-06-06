import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import { CallBacks } from '../../types/main.d';
import { BuyCubesPayload, CubesInitialData, PurchaseInfo } from '../../types/cubes';
import axiosInstance from '../../helpers/axiosInstance';
import { setCubesPurchaseHistory, setInitialData } from '../ducks/cubesDuck';

export function* buyCubes({ payload, callbacks }:{ payload: BuyCubesPayload, callbacks: CallBacks, type:string }) {
  try {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('request', JSON.stringify(payload.data));
    const { data }: {data: any} = yield axiosInstance.post('/Wall/Purchase/Purchase', formData);
    callbacks?.success && callbacks.success(data.redirectLink);
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* getInitialData({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const { data }: { data: CubesInitialData } = yield axiosInstance.get('/Initial/Initial/GetInitialData');
    yield put(setInitialData(data));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* getCubesPurchaseHistory({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const { data }: { data: PurchaseInfo[] } = yield axiosInstance.get('/Wall/Purchase/GetUserPurchases');
    yield put(setCubesPurchaseHistory(data));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}
