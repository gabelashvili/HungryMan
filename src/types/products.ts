import { MediaType, PaginationParams, PaginationType } from './main';

export interface ProductType {
    description: string
    discountPercent: number,
    id: number
    isInStock: boolean
    itemDetails: {
        color: string
        id: number
        inStockCount: number
        item: null | string,
        itemId: number
        size: null | number
    }[]
    medias: MediaType[]
    name: string
    newPrice: number
    price: number
}

export interface GetProductsResponse extends PaginationType {
    items: ProductType[]
}

export interface GetProductsRequest extends PaginationParams {
    OrderBy?: string,
    OrderType?: string
}

export interface ProductsInitialState {
    productsList: GetProductsResponse | null
}
