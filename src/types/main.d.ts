export interface CallBacks {
    success?: Function;
    error?: Function;
  }

export interface PaginationType {
    page: number,
    pageSize: number,
    count: number
  }

export interface PaginationParams {
    Page:number,
    PageSize: number
  }
