import { PaginationParams } from './main';

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
    id: number,
    userId: number,
    user: UserType
    fullAmount: 0,
    itemPurchaseStatus: 1,
    city: string,
    address: string,
    createdAt: string,
    itemSendStatus: 1 | 2 | 3,
    itemPurchaseDetails: any,
    userAddressId: number
}

export interface ProductsOrderHistoryRes extends PaginationParams {
  items: ProductOrderHistory
}
export interface UserReducerInitialState {
  user: AuthedUser | null,
  addresses: null | AddressType[],
  productsOrderHistory: null | ProductsOrderHistoryRes
}
