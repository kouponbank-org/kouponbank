import axios from "axios";
import { User, Owner } from "./kb-types";

export class KouponBankApi {
    BASE_URL: string;

    constructor() {
        this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
    };

    async getUser(userId: number): Promise<User> {
        return axios.get(this.BASE_URL + "/users/" + {"id": userId}).then(response => {
            return response.data
        });
    };

    async createUser(username: string, password: string | number, email: string | number): Promise<User> {
        return axios.post(this.BASE_URL + "/users/", {
            "username": username,
            "user_password": password,
            "user_email": email
        }).then(response => {
            return response.data;
        });
    };

    async removeUser(userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/users/" + userId).then(response => {
            return response.data;
        });
    };

    async getOwner(userId: number): Promise<Owner> {
        return axios.get(this.BASE_URL + "/owners/" + {"id": userId}).then(response => {
            return response.data
        });
    };

    async createOwner(ownerUsername: string, ownerPassword: string | number, ownerEmail: string): Promise<Owner> {
        return axios.post(this.BASE_URL + "/owners/", {
            "owner_username": ownerUsername,
            "owner_password": ownerPassword,
            "owner_email": ownerEmail
        }).then(response => {
            return response.data;
        });
    };

    async removeOwner(userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/owners/" + userId).then(response => {
            return response.data;
        });
    };

};