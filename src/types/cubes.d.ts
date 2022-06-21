import { UserType } from './user';
import { ItemDetail } from './products';
import { MediaType } from './main';

export interface SelectedCubesInfoType {
    cubesId: number[],
    totalPrice: number,
    base64: string | null,
    totalPrice: number,
    enableComment: boolean,
    enableRedirectLink: boolean,
}

export interface PurchaseDetail {
    id: number,
    purchaseId: number,
    squareId: number
}

export interface PurchaseInfo {
        id: number,
        user: UserType,
        userId: number,
        hasComment: boolean,
        comment: string,
        commentPrice:number,
        imageUrl: string,
        imageWidth:number,
        imageHeight:number,
        fullAmount:number,
        squarePrice:number,
        hasRedirectLink: boolean,
        redirectLink: string,
        redirectLinkPrice:number,
        status: number,
        giftSendStatus: number,
        purchaseDetails: PurchaseDetail[],
        purchaseGiftDetails: [
          {
            id: number,
            gift:Gift[]
            giftId: number,
            purchaseId: number,
            size: string
          }
        ],
        mustGenerateInvoice: boolean,
        city: string,
        address: string,
        sendComment: string,
        userAddressId: number,
        createdAt: string,

}

export interface CubesInitialState {
    selectedCubesInfo: SelectedCubesInfoType,
    initialData: CubesInitialData | null,
    purchaseHistory: PurchaseInfo[] | null,
    soldCubesDetails: null | SoldCubesDetail,
    purchasesByPhoneNumber: {[key:string]: PurchaseDetail[][]} | null
}

export interface BuyCubesPayload {
    data: {
        PurchaseGiftDetails: {
            size: string,
            GiftId: number
        }[],
        hasRedirectLink : boolean,
        hasComment : boolean,
        comment : string,
        RedirectLink : string,
        PurchaseDetails: number[],
        UserAddressId:number,
        FullAmount: number
    },
    file: File
}

export interface Square {
        I: number,
        V: number,
        H: number,
        S: number
}

interface Gift {
    id: number,
    name: string,
    url: string,
    width: number,
    height: number,
    title: string,
    description: string,
    options: string[],
    displayName: string
}

export interface CubesInitialData {
        squares: Square[],
        gifts: Gift[]
        purchases: {
            id: number,
            user: UserType
            userId: number,
            hasComment: true,
            comment: string,
            commentPrice: number,
            imageUrl: string,
            imageWidth: number,
            imageHeight: number,
            fullAmount: number,
            squarePrice: number,
            hasRedirectLink: true,
            redirectLink: string,
            redirectLinkPrice: number,
            status: 1 | 2 | 3,
            giftSendStatus: 1 | 2 | 3,
            purchaseDetails: {
                id: number,
                purchaseId: number,
                squareId: number
            }[],
            purchaseGiftDetails: {
                id: number,
                gift: {
                  id: number,
                  name: string,
                  url: string,
                  width: number,
                  height: number
                },
                giftId: number,
                purchaseId: number,
                size: string
             }[],
            createdAt: string,
            mustGenerateInvoice: boolean,
            city: string,
            address: string,
            sendComment: string,
            userAddressId: number
          }[],
        items: {
            id: number,
            name: string,
            description: string,
            price: number,
            discountPercent: number,
            newPrice: number,
            createdAt: string,
            itemDetails: ItemDetail[]
            medias: MediaType[]
            similarItems: string[]
            isInStock: boolean
          }[],
        squareCount: number,
        soldSquareCount: number,
        percent: number,
        squarePrice: number,
        commentPrice: number,
        redirectUrlAdditionalPercent: number,
        purchaserUserCount: number
}

export interface SoldCubesDetail {
  soldCubes: {purchaseId:number, cubeId: number, redirectLink: string}[],
  images: {
    imgUrl: string,
    topLeftCube: {
      id: number;
      row: number;
      column: number
    },
    bottomRightCube: {
      id: number;
      row: number;
      column: number
    }
  }[]
}
