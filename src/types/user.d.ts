import { PaginationParams } from './main';
import { ItemDetail, ProductType } from './products';

export interface UserAuthParams {
    phoneOrEmail: string,
    password: string
}

export interface CompanySignUpParams {
    companyName: string,
    identificationCode: string,
    city: string,
    address: string
}

export interface UserSignUpParams extends Partial<CompanySignUpParams> {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
}

export interface UserType {
    firstName: string,
    lastName: string,
    id: number,
    email: string,
    phone: string,
    address: string,
    city: string,
    companyName: null | string,
    identificationCode: null | string
}

export interface UserSignInResponse {
    token: string,
    user: UserType,
    admin: {
      id: number,
      username: string,
      password: string
    }
}

export interface AuthedUser {
  firstName: string,
  lastName: string,
  id: number,
  email: string,
  phone: string,
  address: string,
  city: string,
  companyName: null | string
  identificationCode: null | string
}

export interface AddressType {
  address: string,
  city: string,
  createdAt: string,
  id: number,
  name: string,
  userId: number
}

export interface AddAddressParams {
  city: string,
  address: string
}

export interface ReqProductsOrderHistory {
  page: number,
  pageSize: number,
  userId: number | null
}

export interface ProductOrderHistory {
  count: number,
  id: number,
  item: ProductType,
  itemDetail: ItemDetail,
  itemDetailId: number,
  itemId: number,
  itemPurchaseId: number,
  price: number,
  itemPurchase: {
    address: string,
    city: string,
    createdAt: string,
    fullAmount: number,
    id: number
    itemPurchaseDetails: any[]
    itemPurchaseStatus: 1 | 2 | 3 | 4
    itemSendStatus: 1 | 2 | 3 | 4,
    userAddressId: number,
    userId: number,
    user: UserType
  }
}

export interface ProductsOrderHistoryRes extends PaginationParams {
  items: ProductOrderHistory[]
}
export interface UserReducerInitialState {
  user: AuthedUser | null,
  addresses: null | AddressType[],
  productsOrderHistory: null | ProductsOrderHistoryRes
}
