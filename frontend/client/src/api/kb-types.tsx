/**
 * Represents the required properties of a User
 */

export interface User {
    id?: number;
    username: string;
    userPassword: string | number;
    userEmail: string;
};

export interface Owner {
    id?: number;
    ownerUsername: string;
    ownerPassword: string | number;
    ownerEmail: string;
};