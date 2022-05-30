export type SelectedCubesType = number[]

export interface CubesInitialState {
    selectedCubes: SelectedCubesType
}

export interface BuyCubesPayload {
    data: {
        PurchaseGiftDetails?: {
            size: string,
            GiftId: number
        }[],
        hasRedirectLink : boolean,
        hasComment : boolean,
        comment : string,
        RedirectLink : string,
        PurchaseDetails: number[],
        UserAddressId:number
    },
    file: File
}
