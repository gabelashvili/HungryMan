import { MediaType, PaginationParams, PaginationType } from './main';

export interface ProductType {
    id: number,
    name: string,
    price: number,
    discountPercent: number,
    newPrice: number,
    createdAt: number,
    itemDetails: {
        id: number,
        item: string,
        itemId: number,
        size: string,
        inStockCount: number,
        color: string
      }[],
    medias: MediaType[]
    isInStock: true
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
