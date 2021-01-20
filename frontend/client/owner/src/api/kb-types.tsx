/**
 * Represents the required properties of KouponBank State
 */
export enum Status {
    NotStarted = "NOT_STARTED",
    Running = "RUNNING",
    Succeeded = "SUCCEEDED",
    Failed = "FAILED",
}

/**
 * Represents the required properties of a Owner
 */
export interface Owner {
    id?: string;
    username: string;
    password: string | number;
    email: string | number;
}

/**
 * Represents the required properties of an Alert
 */
export enum AlertType {
    SUCCESS = "success",
    FAILURE = "failure",
}

export interface Alert {
    displayAlert: boolean;
    alertType: AlertType;
    alertHeader: string | JSX.Element;
    alertBody: string | JSX.Element;
}
/**
 * Represents the required properties of a Business
 */
export interface Business {
    id?: string;
    verified_business?: boolean;
    verified_owner?: boolean;
    verified_email?: boolean;
    business_name: string;
    business_email: string;
    description: string;
    business_picture?: File | null | undefined | string;
    jibunAddr: string;
    roadAddr: string;
    zipNo: string;
    entX: string; // longitude
    entY: string; // latitude
}

/**
 * Menu Type
 */
export interface Menu {
    id?: string;
    title: string;
    description: string;
    price: number;
    picture?: File | null | undefined | string;
}

/**
 * Represents the required properties for the Naver Map Api
 */
export interface NaverMapBound {
    maxLat: string;
    minLat: string;
    maxLng: string;
    minLng: string;
}

/**
 * Represents the required properties of a OwnerDetail
 */
export interface OwnerDetail {
    id?: string;
    name: string;
    gender: string;
    birthday: string;
    location: number | string;
    profile_picture?: File | null | undefined | string;
}

export interface AddressDetail {
    admCd?: string;
    bdKdcd?: string;
    bdMgtSn?: string;
    bdNm?: string;
    buldMnnm?: string;
    buldSlno?: string;
    detBdNmList?: string;
    emdNm?: string;
    emdNo?: string;
    engAddr?: string;
    jibunAddr?: string;
    liNm?: string;
    lnbrMnnm?: string;
    lnbrSlno?: string;
    mtYn?: string;
    rn?: string;
    rnMgtSn?: string;
    roadAddr?: string;
    roadAddrPart1?: string;
    roadAddrPart2?: string;
    sggNm?: string;
    siNm?: string;
    udrtYn?: string;
    zipNo?: string;
    entX?: string;
    entY?: string;
}
