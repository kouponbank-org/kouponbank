/**
 * Represents the required properties of a User
 */
export interface User {
    id?: string;
    username: string;
    password: string | number;
    email: string | number;
};

export enum AlertType {
    SUCCESS = "success",
    FAILURE = "failure",
}

/**
 *
 */
export interface Alert {
    displayAlert: boolean;
    alertType: AlertType;
    alertHeader: string | JSX.Element;
    alertBody: string | JSX.Element;
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
