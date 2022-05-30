import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import { BuyCubesPayload } from '../../types/cubes';

export function* buyCubes({ payload, callbacks }:{ payload: BuyCubesPayload, callbacks: CallBacks, type:string }) {
  try {
    yield console.log(payload);
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.error('მოხდა შეცდომა');
    callbacks?.error && callbacks.error();
  }
}
