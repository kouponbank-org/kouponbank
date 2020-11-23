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
 * Represents the required properties of a User
 */
export interface User {
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
 * Represents the required properties of a Coupon
 */
export interface Coupon {
    id?: string;
    coupon_title: string;
    description: string;
    coupon_code: string;
    coupon_picture?: string;
}

/**
 * Represents the required properties of a CouponBasket
 */
export interface CouponBasket {
    id?: string;
    business_key: string;
    business_name: string;
    coupon_code: string;
    coupon_title?: string;
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
    business_picture?: string;
    jibunAddr: string;
    roadAddr: string;
    zipNo: string;
    entX: string; // longitude
    entY: string; // latitude
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
 * Represents the required properties of a UserDetail
 */
export interface UserDetail {
    id?: string;
    name: string;
    gender: string;
    birthday: string;
    location: number | string;
    profile_picture?: string;
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
