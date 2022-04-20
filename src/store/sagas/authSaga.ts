import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import { setAuthedUser } from '../ducks/authDuck';
import { UserAuthParams, UserSignInResponse, UserSignUpParams } from '../../types/auth';

export function* reqUserLogin({ params, callbacks }:{ params: UserAuthParams, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: UserSignInResponse} = yield axiosInstance
      .post('/Core/User/Login', params);
    yield put(setAuthedUser({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      id: data.user.id,
      email: data.user.email,
      phone: data.user.phone,
    }));
    toast.success('Successfully logged in...');
    localStorage.setItem('token', data.token);
  } catch (error: any) {
    toast.error('შეყვანილი მონაცემები არასწორია...');
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
    const { data }: {data: UserSignInResponse} = yield axiosInstance
      .post('/Core/User/ping');
    yield put(setAuthedUser({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      id: data.user.id,
      email: data.user.email,
      phone: data.user.phone,
    }));
    localStorage.setItem('token', data.token);
    console.log(22);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
  }
}
