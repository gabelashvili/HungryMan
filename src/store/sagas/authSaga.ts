import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import { setAuthedUser } from '../ducks/authDuck';

export function* reqUserLogin({ params, callbacks }:{ params: any, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: any} = yield axiosInstance
      .post('/Admin/Core/Authorization/Login', params);
    yield put(setAuthedUser({
      userName: data.admin.username,
      id: data.admin.id,
    }));
    toast.success('Successfully logged in...');
    localStorage.setItem('token', data.token);
  } catch (error: any) {
    console.log(error.response);
    toast.error('Credentials are incorrect...');
    callbacks?.error && callbacks.error();
  }
}

export function* checkToken({ callbacks }:{ callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: any} = yield axiosInstance
      .post('/Admin/Core/Authorization/ping');
    yield put(setAuthedUser({
      userName: data.admin.username,
      id: data.admin.id,
    }));
    localStorage.setItem('token', data.token);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
  }
}
