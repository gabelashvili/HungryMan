import { put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CallBacks } from '../../types/main.d';
import axiosInstance from '../../helpers/axiosInstance';
import {
  setFilteredProducts, setProductDetails, setProducts, setProductInCart,
} from '../ducks/productsDuck';
import {
  GetProductsRequest, GetProductsResponse, ProductType, PurchaseProductCartItemsResponse, ReqPurchaseProductCartItems, SelectedProductType,
} from '../../types/products';
import { RootState } from '../..';

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

export function* reqAddProductInCart({ product, callbacks }:
  { product: SelectedProductType, callbacks: CallBacks, type:string }) {
  try {
    const selectedProducts: SelectedProductType[] = yield select((state: RootState) => state
      .productsReducer.selectedProductsCart);

    const findIndexProductInCart = selectedProducts.findIndex((el) => el.product.itemDetails[0].id
    === product.product.itemDetails[0].id);
    if (findIndexProductInCart >= 0) {
      if (selectedProducts[findIndexProductInCart].count !== product.count) {
        const products = [...selectedProducts];
        products[findIndexProductInCart].count = product.count;
        yield put(setProductInCart(products));
      }
    } else {
      yield put(setProductInCart([product, ...selectedProducts]));
    }
    callbacks?.success && callbacks.success();
    toast.success(`${product.product.name} დაემატა კალათაში`);
  } catch (error: any) {
    console.log(error);
    callbacks?.error && callbacks.error();
  }
}

export function* reqRemoveProductFromCart({ productId, callbacks }:
  { productId: number, callbacks: CallBacks, type:string }) {
  try {
    const selectedProducts: SelectedProductType[] = yield select((state: RootState) => state
      .productsReducer.selectedProductsCart);
    const filteredData = selectedProducts.filter((el) => el.product.itemDetails[0].id !== productId);
    yield put(setProductInCart(filteredData));
    callbacks?.success && callbacks.success();
    toast.success(`${selectedProducts.find((el) => el.product.itemDetails[0].id === productId)?.product.name} წაიშალა კალათიდან`);
  } catch (error: any) {
    callbacks?.error && callbacks.error();
  }
}

export function* updateProductCountInCart({ id, value, callbacks }:
  { id: number, value: number, callbacks: CallBacks, type:string }) {
  try {
    const selectedProducts: SelectedProductType[] = yield select((state: RootState) => state
      .productsReducer.selectedProductsCart);
    const newSelectedProducts = [...selectedProducts];
    const productIndex = selectedProducts.findIndex((el) => el.product.itemDetails[0].id === id);
    newSelectedProducts[productIndex].count = value;
    yield put(setProductInCart(newSelectedProducts));
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    console.log(error);
    callbacks?.error && callbacks.error();
  }
}

export function* removeUserAddress({ addressId, callbacks }:
  { addressId: number, callbacks: CallBacks, type:string }) {
  try {
    yield axiosInstance.delete(`/Core/UserAddress/DeleteUserAddress/${addressId}`);
    toast.success('მისამართი წაიშალა');
    callbacks?.success && callbacks.success();
  } catch (error: any) {
    toast.success('მოხდა შეცდომა');
    console.log(error);
    callbacks?.error && callbacks.error();
  }
}

export function* purchaseProductCartItems({ params, callbacks }:
  { params: ReqPurchaseProductCartItems, callbacks: CallBacks, type:string }) {
  try {
    const { data }: {data: PurchaseProductCartItemsResponse} = yield axiosInstance.post('/Item/ItemPurchase/PurchaseItems', params);
    callbacks?.success && callbacks.success(data.redirectLink);
  } catch (error: any) {
    toast.success('მოხდა შეცდომა');
    console.log(error);
    callbacks?.error && callbacks.error();
  }
}
