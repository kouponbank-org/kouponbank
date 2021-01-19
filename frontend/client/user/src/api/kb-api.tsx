import axios from "axios";

import { AddressDetail, Business, NaverMapBound, User, UserDetail } from "./kb-types";

export class KouponBankApi {
    BASE_URL: string;

    BASE_NAVER_MAP_API_KEY: string;

    BASE_JUSO_KR_API_KEY: string;

    BASE_JUSO_KR_URL: string;

    BASE_JUSO_COORD_KR_API_KEY: string;

    BASE_JUSO_COORD_KR_URL: string;

    constructor() {
        this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
        this.BASE_NAVER_MAP_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;
        this.BASE_JUSO_KR_URL = process.env.REACT_APP_JUSO_KR_BASE_URL;
        this.BASE_JUSO_KR_API_KEY = process.env.REACT_APP_JUSO_KR_API_KEY;
        this.BASE_JUSO_COORD_KR_URL = process.env.REACT_APP_JUSO_COORD_KR_BASE_URL;
        this.BASE_JUSO_COORD_KR_API_KEY = process.env.REACT_APP_JUSO_COORD_KR_API_KEY;
    }

    /*LOGIN API*/
    async loginUser(user: User): Promise<User> {
        return axios.post<User>(`${this.BASE_URL}/login/user/`, user).then((response) => {
            return response.data;
        });
    }

    /*USER API*/
    async createUser(user: User, userDetail): Promise<User> {
        return axios
            .post<User>(`${this.BASE_URL}/users/`, {
                    user: user,
                    user_detail: userDetail,
                }
            )
            .then((response) => {
            return response.data;
        });
    }

    async getUser(userId: string): Promise<User> {
        return axios.get<User>(`${this.BASE_URL}/users/${userId}`).then((response) => {
            return response.data;
        });
    }

    async removeUser(user_id: string): Promise<void> {
        return axios.delete<void>(`${this.BASE_URL}/users/${user_id}`).then((response) => {
            return response.data;
        });
    }

    /*User Detail API*/
    async updateUserDetail(user_id: string, userDetail: UserDetail): Promise<UserDetail> {
        const form_data = new FormData();
        for (const key in userDetail) {
            const value = userDetail[key];
            form_data.append(key, value);
        }

        if (userDetail.user_picture === null) {
            return axios
                .put<UserDetail>(`${this.BASE_URL}/users/${user_id}/detail/`, userDetail)
                .then((response) => {
                    return response.data;
                });
        } else {
            return axios
                .put<UserDetail>(`${this.BASE_URL}/users/${user_id}/detail/`, form_data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    return response.data;
                });
        }
    }

    /*Business API*/
    async getBusiness(business_id: string): Promise<Business> {
        return axios.get<Business>(`${this.BASE_URL}/business/${business_id}`).then((response) => {
            return response.data;
        });
    }

    async getBusinesses(): Promise<Business[]> {
        return axios.get<Business[]>(`${this.BASE_URL}/business/`).then((response) => {
            return response.data;
        });
    }

    async getBusinessesFromSearch(char: string): Promise<Business[]> {
        return axios
            .get<Business[]>(`${this.BASE_URL}/search/`, {
                params: {
                    char: char,
                },
            })
            .then((response) => {
                return response.data;
            });
    }

    /* Business API used for Naver Map API */
    async getAllBusinessWithinNaverMapBounds(naverMapBound: NaverMapBound): Promise<Business[]> {
        return axios
            .get<Business[]>(`${this.BASE_URL}/map/`, {
                params: {
                    maxLat: naverMapBound.maxLat,
                    minLat: naverMapBound.minLat,
                    maxLng: naverMapBound.maxLng,
                    minLng: naverMapBound.minLng,
                },
            })
            .then((response) => {
                return response.data;
            });
    }

    async findAddress(address: string): Promise<AddressDetail[]> {
        return axios
            .get(
                `${this.BASE_JUSO_KR_URL}?currrentPage=1&countPerPage=10&keyword=${address}&confmKey=${this.BASE_JUSO_KR_API_KEY}=&resultType=json`,
            )
            .then((response) => {
                return response.data.results.juso;
            });
    }

    async findAddressCoordinates(address: AddressDetail): Promise<AddressDetail> {
        return axios
            .get(
                this.BASE_JUSO_COORD_KR_URL +
                    "?admCd=" +
                    address.admCd +
                    "&rnMgtSn=" +
                    address.rnMgtSn +
                    "&udrtYn=" +
                    address.udrtYn +
                    "&buldMnnm=" +
                    address.buldMnnm +
                    "&buldSlno=" +
                    address.buldSlno +
                    "&confmKey=" +
                    this.BASE_JUSO_COORD_KR_API_KEY +
                    "=&resultType=json",
            )
            .then((response) => {
                return response.data.results.juso[0];
            });
    }
}
