import { MediaType, PaginationParams, PaginationType } from './main';

export interface ItemDetail {
    color: string
    id: number
    inStockCount: number
    item: null | string,
    itemId: number
    size: string
}

export interface Product {
    description: string
    discountPercent: number,
    id: number
    isInStock: boolean
    itemDetails: ItemDetail[]
    medias: MediaType[]
    name: string
    newPrice: number
    price: number
}

export interface ProductType extends Product{
    similarItems: Product[]
}

export interface GetProductsResponse extends PaginationType {
    items: ProductType[]
}

export interface GetProductsRequest extends PaginationParams {
    OrderBy?: string,
    OrderType?: string
}

export interface SelectedProductType {
    product: ProductType,
    count: number,
    maxInStock: number
}
export interface ProductsInitialState {
    productsList: GetProductsResponse | null,
    productDetails: null | ProductType,
    selectedProductsCart: SelectedProductType[]
}

export enum Sizes {
    XS =1,
    S = 2,
    M = 3,
    L = 4,
    XL = 5,
    '2XL' = 6,
    '3XL' = 7,
  }

export interface FormattedItemsDetails {
    id: number,
    count: number
  }

export type ReqPurchaseProductCartItems = {
    itemDetails: FormattedItemsDetails[],
    userAddressId: number
}

export type PurchaseProductCartItemsResponse = {
    amount: number
    currency: string,
    expirationMinutes: number,
    redirectLink: string
}
