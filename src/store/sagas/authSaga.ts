import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import { setAuthedUser } from '../ducks/authDuck';
import { UserSignUpParams } from '../../types/auth';

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

export function* signUp({ params, callbacks }:{ params: UserSignUpParams, callbacks: CallBacks, type:string }) {
  try {
    yield axiosInstance.post('/Core/User/Register', params);
    toast.success('რეგისტრაცია წარმატებით დასრულდა...');
  } catch (error: any) {
    console.log(error.response.data);
    toast.error(error.response.status === 409 ? error.response.data.Message : 'შეავსეთ ყველა სავალდებულო ველი.');
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
