// React Components
// Koupon Bank Frontend Components
// API Components
// Material UI Components
import axios from "axios";
import { User } from "./kb-types";

export class KouponBankApi {
    BASE_URL: string

    constructor() {
        this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
    }

    async getUser(userId: number): Promise<User> {
        return axios.get(this.BASE_URL + "/api/users" + {"id": userId}).then(response => {
            return response.data
        });
    }

    async createUser(username: string, userPassword: number): Promise<User> {
        return axios.post(this.BASE_URL + "/api/users", {
            "username": username,
            "password": userPassword
        }).then(response => {
            return response.data;
        });
    }

    async removeUser(userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/api/users/" + userId).then(response => {
            return response.data;
        });
    }

}