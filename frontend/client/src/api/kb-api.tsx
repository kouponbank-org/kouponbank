import axios from "axios";
import { Business, BusinessLocation, NaverMapBound, User, UserDetail } from "./kb-types";

export class KouponBankApi {
    BASE_URL: string;

    constructor() {
        this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
    };

    /*LOGIN API*/
    async loginUser(
        username: string,
        password: string | number,
        email: string | number
    ): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/login/user/`,
            {
                "username": username,
                "password": password,
                "email": email
            }
        )
        .then(response => {
            return response.data
        });
    };

    async loginOwner(
        username: string,
        password: string | number,
        email: string | number
    ): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/login/owner/`,
            {
                "username": username,
                "password": password,
                "email": email
            }
        )
        .then(response => {
            return response.data
        });
    };
    
    /*USER API*/
    async createUser(username: string, password: string | number, email: string | number): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/users/`,
            {
                "username": username,
                "password": password,
                "email": email
            }
        )
        .then(response => {
            return response.data;
        });
    };

    async getUser(userId: string): Promise<User> {
        return axios.get(
            `${this.BASE_URL}/users/${userId}`
        )
        .then(response => {
            return response.data
        });
    };

    async removeUser(userId: string): Promise<void> {
        return axios.delete(
            `${this.BASE_URL}/users/${userId}`
        )
        .then(response => {
            return response.data;
        });
    };

    async createOwner(username: string, password: string | number, email: string | number): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/owners/`,
            {
                "username": username,
                "password": password,
                "email": email
            }
        )
        .then(response => {
            return response.data;
        });
    };

    async getOwner(userId: string): Promise<User> {
        return axios.get(
            `${this.BASE_URL}/owners/${userId}`
        )
        .then(response => {
            return response.data
        });
    };

    async removeOwner(userId: string): Promise<void> {
        return axios.delete(
            `${this.BASE_URL}/owners/${userId}`
        )
        .then(response => {
            return response.data;
        });
    };


    /*User Detail API*/
    async getUserDetail(userId: string): Promise<UserDetail> {
        return axios.get(
            `${this.BASE_URL}/users/${userId}/detail/`
        )
        .then(response => {
            return response.data
        });
    };

    async updateUserDetail(
        userId: string,
        name: string, 
        gender: string, 
        birthday: string, 
        location: string | number, 
        profile_picture: null
    ): Promise<UserDetail> {
        return axios.put(
            `${this.BASE_URL}/users/${userId}/detail/`, 
            {
                "name": name,
                "gender": gender,
                "birthday": birthday,
                "location": location,
                "profile_picture": profile_picture,
            }
        )
        .then(response => {
            return response.data;
        });
    };

    /* Business API */
    async createBusiness(
        userId: string,
        business: Business
    ): Promise<Business> {
        return axios.post(
            `${this.BASE_URL}/owners/${userId}/detail/business/`,
            business
        )
        .then(response => {
            return response.data;
        });
    };

    async createBusinessLocation(
        businessLocation: BusinessLocation
    ): Promise<BusinessLocation> {
        return axios.post(
            `${this.BASE_URL}/map/`,
            businessLocation
        )
        .then(response => {
            return response.data;
        });
    };

    /* Business API used for Naver Map API */
    async getAllBusinessWithinNaverMapBounds(
        naverMapBound: NaverMapBound
    ): Promise<BusinessLocation[]> {
        return axios.get(
            `${this.BASE_URL}/map/`,
            {
                params: {
                    "maxLat": naverMapBound.maxLat,
                    "minLat": naverMapBound.minLat,
                    "maxLng": naverMapBound.maxLng,
                    "minLng": naverMapBound.minLng
                }
            }
        )
        .then(response => {
            return response.data
        });
    };

};

 