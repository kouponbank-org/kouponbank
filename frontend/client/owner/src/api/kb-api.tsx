import axios from "axios";
import {
    AddressDetail,
    Business,
    Menu,
    Coupon,
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

    /**
     * Coupon
     */
    async createCoupon(userId: string, businessId: string, coupon: Coupon): Promise<Coupon> {
        return axios
            .post<Coupon>(
                `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/`,
                {
                    coupon_title: coupon.coupon_title,
                    description: coupon.description,
                    coupon_code: coupon.coupon_code,
                    coupon_picture: null,
                },
            )
            .then((response) => {
                return response.data;
            });
    }

    async getCoupon(userId: string, businessId: string, couponId: string): Promise<Coupon> {
        return axios
            .get<Coupon>(
                `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/${couponId}/`,
            )
            .then((response) => {
                return response.data;
            });
    }

    async updateCoupon(
        userId: string,
        businessId: string,
        couponId: string,
        coupon: Coupon,
    ): Promise<Coupon> {
        return axios
            .put<Coupon>(
                `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/${couponId}/`,
                coupon,
            )
            .then((response) => {
                return response.data;
            });
    }

    async removeCoupon(userId: string, businessId: string, couponId: string): Promise<void> {
        return axios
            .delete<void>(
                `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/${couponId}/`,
            )
            .then((response) => {
                return response.data;
            });
    }
    
    /**
     * Owner
     */

    // OLD
    // async createOwner(owner: Owner): Promise<Owner> {
    //     return axios.post<Owner>(`${this.BASE_URL}/owners/`, owner).then((response) => {
    //         return response.data;
    //     });
    // }

    // NEW, added userId
    async createOwner(owner: Owner, userId: string): Promise<Owner> {
        return axios.post<Owner>(`${this.BASE_URL}/owners/${userId}`, owner).then((response) => {
            return response.data;
        });
    }

    /* LOGIN OWNER */
    // /login/owner/ changed to => /login/owners/
    async loginOwner(owner: Owner): Promise<Owner> {
        return axios.post<Owner>(`${this.BASE_URL}/login/owners/`, owner).then((response) => {
            return response.data;
        });
    }

    async getOwner(userId: string): Promise<Owner> {
        return axios.get<Owner>(`${this.BASE_URL}/owners/${userId}`).then((response) => {
            return response.data;
        });
    }

    /* update ? */

    async removeOwner(userId: string): Promise<void> {
        return axios.delete<void>(`${this.BASE_URL}/owners/${userId}`).then((response) => {
            return response.data;
        });
    }
    
    /**
     * Owner Detail
     */

    /* create ? */

    async getOwnerDetail(userId: string): Promise<OwnerDetail> {
        return axios
            .get<OwnerDetail>(`${this.BASE_URL}/owners/${userId}/detail/`)
            .then((response) => {
                return response.data;
            });
    }

    async updateOwnerDetail(userId: string, ownerDetail: OwnerDetail): Promise<OwnerDetail> {
        return axios
            .put<OwnerDetail>(`${this.BASE_URL}/owners/${userId}/detail/`, ownerDetail)
            .then((response) => {
                return response.data;
            });
    }

    /* delete ? */

    /**
     * Owner Business
     */
    async createOwnerBusiness(userId: string, business: Business): Promise<Business> {
        return axios
            .post<Business>(`${this.BASE_URL}/owners/${userId}/detail/business/`, business)
            .then((response) => {
                return response.data;
            });
    }

    async getOwnerBusiness(userId: string, businessId: string): Promise<Business> {
        return axios
            .get<Business>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`)
            .then((response) => {
                return response.data;
            });
    }

    async getOwnerBusinesses(userId: string): Promise<Business[]> {
        return axios
            .get<Business[]>(`${this.BASE_URL}/owners/${userId}/detail/business/`)
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

    /* update ? */
    /* delete ? */
    
    /**
     * Owner Business Detail Menu
     */
    // TODO: ADD MENU TYPE TO kb-types.tsx
    // NEW
    async createOwnerMenu(userId: string, businessId: string): Promise<Menu> {
        return axios
            .post<Menu>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/menu`)
            .then((response) => {
                return response.data;
            });
    }
    
    async getOwnerMenu(userId: string, businessId: string, menuId: string): Promise<Menu> {
        return axios
            .get<Menu>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/menu/${menuId}`)
            .then((response) => {
                return response.data;
            });
    }

    async getOwnerMenus(userId: string, businessId: string): Promise<Menu> {
        return axios
            .get<Menu>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/menu`)
            .then((response) => {
                return response.data;
            });
    }
    
    async updateOwnerMenu(userId: string, businessId: string, menuId: string, menu: Menu): Promise<Menu> {
        return axios
            .put<Menu>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/menu/${menuId}`)
            .then((response) => {
                return response.data;
            });
    }

    async removeOwnerMenu(userId: string, businessId: string, menuId: string): Promise<void> {
        return axios
            .delete<void>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/menu/${menuId}`)
            .then((response) => {
                return response.data;
            });
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

    // async updateBusiness(
    //     userId: string,
    //     businessId: string,
    //     business: Business,
    // ): Promise<Business> {
    //     return axios
    //         .put<Business>(
    //             `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`,
    //             business,
    //         )
    //         .then((response) => {
    //             return response.data;
    //         });
    // }

    async updateBusiness(
        userId: string,
        businessId: string,
        business: Business,
    ): Promise<Business> {
        const form_data = new FormData();
        for (const key in business) {
            const value = business[key];
            form_data.append(key, value);
        }
        if (business.business_picture === null) {
            return axios
            .put<Business>(
                `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`,
                business,
            )
            .then((response) => {
                return response.data;
            });
        } else {
            return axios
                .put<Business>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`, form_data, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    return response.data;
                });
        }
    }

    async removeBusiness(userId: string, businessId: string): Promise<void> {
        return axios
            .delete<void>(`${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`)
            .then((response) => {
                return response.data;
            });
    }
}
