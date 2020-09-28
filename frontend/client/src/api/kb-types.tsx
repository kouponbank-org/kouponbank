/**
 * Represents the required properties of KouponBank State
 */
export enum Status {
    NotStarted="NOT_STARTED",
    Running="RUNNING",
    Succeeded="SUCCEEDED",
    Failed="FAILED",
}

/**
 * Represents the required properties of a User
 */
export interface User {
    id?: string;
    username: string;
    password: string | number;
    email: string | number;
};

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
    business_name: string;
    business_email: string;
    description: string;
    business_picture?: string;
}

export interface BusinessLocation {
    id?: string;
    business_name: string;
    doromyeong: string;
    jibeon: string;
    postal_code: string;
    // lng
    x: string;
    // lat
    y: string;
};

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
    x: string;
    y: string;
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
    profile_picture?: null;
};
