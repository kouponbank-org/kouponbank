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
 * Represents the required properties of a User
 */
export interface User {
    id?: string;
    user_detail?: UserDetail;
    favorite_businesses?: Business[];
    username?: string;
    password: string;
    email: string;
}

export interface UserDetail {
    id?: string;
    name?: string;
    gender?: string;
    birthday?: string;
    address?: string;
    cell_number?: string;
    user_picture?: File | null | undefined | string;
}

/**
 * Represents the required properties of a Business
 */
export interface Business {
    id?: string;
    business_address?: BusinessAddress;
    business_detail?: BusinessDetail;
    business_name: string;
    business_number: string;
    business_description: string;
}

export interface BusinessDetail {
    id?: string;
    business_email: string;
    business_wifi: boolean;
    business_picture?: File | null | undefined | string;
}

export interface BusinessAddress {
    id?: string;
    roadAddr: string;
    jibunAddr: string;
    zipNo: string;
    entX: number | string;
    entY: number | string;
}

export interface BusinessVerification {
    id?: string;
    verified_business: boolean;
    verified_owner: boolean;
    verified_email: boolean;
}

/**
 * Represents the required properties of a Menu
 */
export interface Menu {
    id?: string;
    menu_title: string;
    menu_description: string;
    menu_price: number;
    menu_picture?: File | null | undefined | string;
}

/**
 * Represents the required properties of a Table
 */
export interface Table {
    id?: string;
    table_capacity: number;
    table_outlet: boolean;
    table_near_wall: boolean;
}

/**
 * Represents the required properties of a Reservation
 */
export interface Reservation {
    id?: string;
    start_time: string;
    end_time: string;
}

/**
 * Represents the required properties of a Order
 */
export interface Order {
    id?: string;
    total_price: number;
    total_quantity: number;
    order_complete_status: boolean;
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

export interface Coordinate {
    lat: number | string;
    lng: number | string;
}

export interface GeolocationPosition {
    coords: GeolocationCoordinates;
    timestamp?: number | string;
}

export interface GeolocationCoordinates {
    accuracy?: number | string;
    altitude?: number | string;
    altitudeAccuracy?: number | string;
    heading?: number | string;
    latitude: number;
    longitude: number;
    speed?: number | string;
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

export interface BusinessFilterDetail {
    date: string;
    start_time: string;
    end_time: string;
    guest: number;
    emdNm: string;
    sggNm: string;
    siNm: string;
}
