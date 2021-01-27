import axios from "axios";

import {
    AddressDetail,
    Business,
    BusinessAddress,
    BusinessDetail,
    Menu,
    NaverMapBound,
    Owner,
    OwnerDetail,
} from "./kb-types";

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
    async loginOwner(owner: Owner): Promise<Owner> {
        return axios.post<Owner>(`${this.BASE_URL}/login/owners/`, owner).then((response) => {
            return response.data;
        });
    }
    
    /*OWNER API*/
    async createOwner(owner: Owner, ownerDetail: OwnerDetail): Promise<Owner> {
        return axios
            .post<Owner>(`${this.BASE_URL}/owners/`, {
                owner: owner,
                owner_detail: ownerDetail,
            })
            .then((response) => {
                return response.data;
            });
    }

    async getOwner(ownerId: string): Promise<Owner> {
        return axios.get<Owner>(`${this.BASE_URL}/owners/${ownerId}`).then((response) => {
            return response.data;
        });
    }

    async removeOwner(ownerId: string): Promise<void> {
        return axios.delete<void>(`${this.BASE_URL}/owners/${ownerId}`).then((response) => {
            return response.data;
        });
    }

    /*Owner Detail API*/
    async updateOwnerDetail(ownerId: string, ownerDetail: OwnerDetail): Promise<Owner> {
        return axios
            .put<Owner>(`${this.BASE_URL}/owners/${ownerId}/detail/`, ownerDetail)
            .then((response) => {
                return response.data;
            });
    }

    /* Business API - OWNER */
    async createBusiness(
        ownerId: string,
        business: Business,
        businessDetail: BusinessDetail,
        businessAddress: BusinessAddress,
    ): Promise<Business> {
        return axios
            .post<Business>(`${this.BASE_URL}/owners/${ownerId}/business/`, {
                business: business,
                business_detail: businessDetail,
                address: businessAddress,
            })
            .then((response) => {
                return response.data;
            });
    }

    async getOwnerBusiness(ownerId: string, businessId: string): Promise<Business> {
        return axios
            .get<Business>(`${this.BASE_URL}/owners/${ownerId}/business/${businessId}/`)
            .then((response) => {
                return response.data;
            });
    }

    async getOwnerBusinesses(ownerId: string): Promise<Business[]> {
        return axios
            .get<Business[]>(`${this.BASE_URL}/owners/${ownerId}/business/`)
            .then((response) => {
                return response.data;
            });
    }

    async removeBusiness(ownerId: string, businessId: string): Promise<void> {
        return axios
            .delete<void>(`${this.BASE_URL}/owners/${ownerId}/business/${businessId}/`)
            .then((response) => {
                return response.data;
            });
    }

    async updateBusiness(
        ownerId: string,
        businessId: string,
        business: Business,
    ): Promise<Business> {
        const form_data = new FormData();
        for (const key in business) {
            const value = business[key];
            form_data.append(key, value);
        }
        if (business.business_detail.business_picture === null) {
            return axios
            .put<Business>(
                `${this.BASE_URL}/owners/${ownerId}/business/${businessId}/`,
                business,
            )
            .then((response) => {
                return response.data;
            });
        } else {
            return axios
                .put<Business>(`${this.BASE_URL}/owners/${ownerId}/business/${businessId}/`, form_data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    return response.data;
                });
        }
    }

    /** 
      * Menu
      */
    async createMenu(businessId: string): Promise<Menu> {
        return axios
            .post<Menu>(`${this.BASE_URL}/owners/detail/business/${businessId}/menu`)
            .then((response) => {
                return response.data;
            });
    }

    async getMenus(businessId: string): Promise<Menu> {
        return axios
            .get<Menu>(`${this.BASE_URL}/owners/detail/business/${businessId}/menu`)
            .then((response) => {
                return response.data;
            });
    }

    async getMenu(businessId: string, menuId: string): Promise<Menu> {
        return axios
            .get<Menu>(`${this.BASE_URL}/owners/detail/business/${businessId}/menu/${menuId}`)
            .then((response) => {
                return response.data;
            });
    }

    async removeMenu(businessId: string, menuId: string): Promise<void> {
        return axios
            .delete<void>(`${this.BASE_URL}/owners/detail/business/${businessId}/menu/${menuId}`)
            .then((response) => {
                return response.data;
            });
    }

    /** 
     * Business
     */

    async getBusiness(businessId: string): Promise<Business> {
        return axios.get<Business>(`${this.BASE_URL}/business/${businessId}`).then((response) => {
            return response.data;
        });
    }

    async getBusinesses(): Promise<Business[]> {
        return axios.get<Business[]>(`${this.BASE_URL}/business/`).then((response) => {
            return response.data;
        });
    }

    async getBusinessesFromSearch(char: string): Promise<Business[]> {
        /*
        var CancelToken = axios.CancelToken;
        var cancel;

        if (cancel) {
            cancel();
        };*/

        return axios
            .get<Business[]>(`${this.BASE_URL}/search/`, {
                /*
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                }),
                */
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
            .get<Business[]>(`${this.BASE_URL}/business_map/`, {
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
