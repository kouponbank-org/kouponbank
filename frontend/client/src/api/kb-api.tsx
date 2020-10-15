import axios from "axios";
import { AddressDetail, Business, BusinessLocation, Coordinate, NaverMapBound, User, UserDetail, Coupon, CouponBasket } from "./kb-types";

export class KouponBankApi {
    BASE_URL: string;
    BASE_NAVER_MAP_API_KEY: string;
    BASE_JUSO_API_KEY: string;
    BASE_JUSO_URL: string;

    constructor() {
        this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
        this.BASE_JUSO_URL = process.env.REACT_APP_JUST_API_BASE_URL;
        this.BASE_NAVER_MAP_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;
        this.BASE_JUSO_API_KEY = process.env.REACT_APP_JUSO_KR_API_KEY;
    };

    /*LOGIN API*/
    async loginUser(
        username: string,
        password: string | number,
        email: string | number,
    ): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/login/user/`,
            {
                "username": username,
                "password": password,
                "email": email,
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
                "email": email,
            }
        )
        .then(response => {
            return response.data
        });
    };
    
    /*USER API*/
    async createUser(
        username: string, 
        password: string | number, 
        email: string | number
    ): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/users/`,
            {
                "username": username,
                "password": password,
                "email": email,
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

    async createOwner(
        username: string, 
        password: string | number, 
        email: string | number
    ): Promise<User> {
        return axios.post(
            `${this.BASE_URL}/owners/`,
            {
                "username": username,
                "password": password,
                "email": email,
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
    async getBusiness(
        userId: string,
        businessId: string,
    ): Promise<Business> {
        return axios.get(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`
        )
        .then(response => {
            return response.data;
        });
    };

    async removeBusiness(
        userId: string,
        businessId: string,
    ): Promise<void> {
        return axios.delete(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`
        )
        .then(response => {
            return response.data;
        });
    };

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

    async updateBusiness(
        userId: string,
        businessId: string,
        business: Business
    ): Promise<Business> {
        return axios.put(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/`,
            business
        )
        .then(response => {
            return response.data;
        });
    };

    //Business Location API
    async createBusinessLocation(
        businessId: string,
        businessName: string,
        latlng: Coordinate,
        businessLocation: BusinessLocation
    ): Promise<BusinessLocation> {
        return axios.post(
            `${this.BASE_URL}/map/`,
            {
                "id": businessId,
                "business_name": businessName,
                "doromyeong": businessLocation.roadAddress,
                "jibeon": businessLocation.jibunAddress,
                "postal_code": businessLocation.zipcode,
                "x": latlng.x,
                "y": latlng.y
            }
        )
        .then(response => {
            return response.data;
        });
    };

    async updateBusinessLocation(
        businessId: string,
        businessName: string,
        latlng: Coordinate,
        businessLocation: BusinessLocation
    ): Promise<BusinessLocation> {
        return axios.put(
            `${this.BASE_URL}/map/${businessId}/`,
            {
                "id": businessId,
                "business_name": businessName,
                "doromyeong": businessLocation.roadAddress,
                "jibeon": businessLocation.jibunAddress,
                "postal_code": businessLocation.zipcode,
                "x": latlng.x,
                "y": latlng.y
            }
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

    async findAddress (
        address: string,
    ): Promise<AddressDetail[]> {
        return axios.get(
            `${this.BASE_JUSO_URL}?currrentPage=1&countPerPage=10&keyword=${address}&confmKey=${this.BASE_JUSO_API_KEY}=&resultType=json`
        )
        .then(response => {
            return response.data.results.juso
        })
    }
    /*Owner Detail API*/
    async getOwnerDetail(userId: string): Promise<UserDetail> {
        return axios.get(
            `${this.BASE_URL}/owners/${userId}/detail/`
        )
        .then(response => {
            return response.data
        });
    };

    async updateOwnerDetail(
        userId: string,
        name: string, 
        gender: string, 
        birthday: string, 
        location: string | number, 
        profile_picture: null
    ): Promise<UserDetail> {
        return axios.put(
            `${this.BASE_URL}/owners/${userId}/detail/`, 
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

    /* Coupon API */
    async getCoupon(
        userId: string,
        businessId: string,
        couponId: string
    ): Promise<Coupon> {
        return axios.get(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/${couponId}/`,
        )
        .then(response => {
            return response.data;
        });
    };

    async removeCoupon(
        userId: string,
        businessId: string,
        couponId: string
    ): Promise<void> {
        return axios.delete(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/${couponId}/`,
        )
        .then(response => {
            return response.data;
        });
    };

    async createCoupon(
        userId: string,
        businessId: string,
        coupon: Coupon
    ): Promise<Coupon> {
        return axios.post(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/`,
            {
                "coupon_title": coupon.coupon_title,
                "description": coupon.description,
                "coupon_code": coupon.coupon_code,
                "coupon_picture": null,
            }
        )
        .then(response => {
            return response.data;
        });
    };

    async updateCoupon(
        userId: string,
        businessId: string,
        couponId: string,
        coupon: Coupon
    ): Promise<Coupon> {
        return axios.put(
            `${this.BASE_URL}/owners/${userId}/detail/business/${businessId}/coupon/${couponId}/`,
            coupon
        )
        .then(response => {
            return response.data;
        });
    };
};

