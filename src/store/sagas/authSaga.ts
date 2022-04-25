import { put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import { clearAuthedUser, setAuthedUser } from '../ducks/authDuck';
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
      address: data.user.address,
      city: data.user.city,
      companyName: null,
      identificationCode: data.user.identificationCode,
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
    callbacks?.success && callbacks.success();
  } catch (error: any) {
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
      address: data.user.address,
      city: data.user.city,
      companyName: null,
      identificationCode: data.user.identificationCode,
    }));
    localStorage.setItem('token', data.token);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    callbacks?.error && callbacks.error();
  }
}

export function* reqPasswordRecover({ phoneOrEmail, callbacks }:
  { phoneOrEmail: string, callbacks: CallBacks, type:string }) {
  try {
    yield axiosInstance.post('/Core/User/PasswordRecover', { phoneOrEmail });
    toast.success('პაროლის აღსადგენად შეამოწმეთ თქვენი ელ.ფოსტა');
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* setPassword({ password, token, callbacks }:
  { password: string, token: string, callbacks: CallBacks, type:string }) {
  try {
    yield axios.put(`${process.env.REACT_APP_BASE_URL}/Core/User/SetPassword`, { password }, { headers: { authorization: `Bearer ${token}` } });
    toast.success('პაროლი წარმატებით შეიცვალა.');
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}

export function* logOut() {
  try {
    yield localStorage.removeItem('token');
    yield put(clearAuthedUser());
  } catch (error: any) {
    console.log(error);
  }
}
