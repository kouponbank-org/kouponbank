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

    async createUser(name: string): Promise<User> {
        return axios.post(this.BASE_URL + "/api/users", {"name": name}).then(response => {
            return response.data;
        });
    }

    async removeUser(userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/api/users/" + userId).then(response => {
            return response.data;
        });
    }

}