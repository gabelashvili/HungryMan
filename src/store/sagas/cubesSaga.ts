import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import { CallBacks } from '../../types/main.d';
import {
  BuyCubesPayload, CubesInitialData, PurchaseDetail, PurchaseInfo, SoldCubesDetail,
} from '../../types/cubes';
import axiosInstance from '../../helpers/axiosInstance';
import {
  setCubesPurchaseHistory, setInitialData, setPurchasesByPhoneNumber, setSoldCubesDetail,
} from '../ducks/cubesDuck';
import { CUBES_TOTAL_ROWS } from '../../Routes/Cubes/Cubes';
import { generatePath } from '../../helpers';

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
    const formattedData: SoldCubesDetail = {
      soldCubes: [],
      images: [],
    };
    data.purchases.forEach((el) => {
      const soldCubes: {purchaseId:number, cubeId: number, redirectLink:string}[] = [];
      el.purchaseDetails.forEach((cube) => {
        soldCubes.push({
          purchaseId: cube.purchaseId,
          cubeId: cube.squareId,
          redirectLink: el.redirectLink,
        });
      });
      formattedData.soldCubes.push(...soldCubes);
      const sorted = [...soldCubes].sort((a, b) => (a.cubeId) - b.cubeId);
      // const img = new Image();
      // img.onload = () => {
      formattedData.images.push({
        imgUrl: generatePath(el.imageUrl),
        topLeftCube: {
          id: sorted[0].cubeId,
          row: sorted[0].cubeId % CUBES_TOTAL_ROWS,
          column: Math.ceil(sorted[0].cubeId / CUBES_TOTAL_ROWS),
        },
        bottomRightCube: {
          id: sorted[sorted.length - 1].cubeId,
          row: sorted[sorted.length - 1].cubeId % CUBES_TOTAL_ROWS,
          column: Math.ceil(sorted[sorted.length - 1].cubeId / CUBES_TOTAL_ROWS),
        },
      });
      // };
      // img.src = generatePath(el.imageUrl);
    });

    const purchasesByPhoneNumber = data.purchases.reduce((acc: {[key:string]: PurchaseDetail[][]}, cur) => {
      if (acc[cur.user.phone]) {
        return {
          ...acc,
          [cur.user.phone]: [...acc[cur.user.phone], cur.purchaseDetails],
        };
      }
      return {
        ...acc,
        [cur.user.phone]: [cur.purchaseDetails],
      };
    }, {});

    yield put(setInitialData(data));
    yield put(setSoldCubesDetail({ ...formattedData }));
    yield put(setPurchasesByPhoneNumber({ ...purchasesByPhoneNumber }));
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
