import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import { BuyCubesPayload } from '../../types/cubes';
import axiosInstance from '../../helpers/axiosInstance';

export function* buyCubes({ payload, callbacks }:{ payload: BuyCubesPayload, callbacks: CallBacks, type:string }) {
  try {
    const formData = new FormData();
    formData.append('file', payload.file);
    console.log(payload.file);
    formData.append('request', JSON.stringify(payload.data));
    yield axiosInstance.post('/Wall/Purchase/Purchase', formData);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}
