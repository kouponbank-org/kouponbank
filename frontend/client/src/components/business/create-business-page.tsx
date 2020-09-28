import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, BusinessLocation, User } from "../../api/kb-types";
import { createBusiness, createBusinessLocation } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { CreateBusinessForm } from "./create-business-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createBusiness: (
        api: KouponBankApi,
        userId: string,
        business: Business,
    ) => Promise<void>;
    createBusinessLocation: (
        api: KouponBankApi,
        businessLocation: BusinessLocation,
    ) => Promise<void>;
    user: User;
    business: Business;
    businessLocation: BusinessLocation;
};

export const CreateBusinessPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [business, setBusiness] = useState(props.business);
    const [businessLocation, setBusinessLocation] = useState(props.businessLocation);
    
    // 사업장 정보 (이름, 이메일)
    const businessInformationInput = (event): void => {
        setBusiness({
            ...business,
            [event.target.name]: event.target.value
        });
    };

    // 사업장 주소 (도로명, 지번, 우편번호)
    const businessLocationInput = (event): void => {
        setBusinessLocation({
            ...businessLocation,
            [event.target.name]: event.target.value
        });
    };    
    
    // 사업장 주소에서 좌표 가져오는 Naver Maps API Call
    const getLatLngFromAddress = (address) => {
        // Param 주소를 가지고 네이버 Geocode를 사용해서
        // 정확한 주소와 좌표를 찾기
        window.naver.maps.Service.geocode({
            address: address
        }, function(status, response) {
            if (status !== window.naver.maps.Service.Status.OK) {
                return alert('주소를 못 찾았습니다');
            }
    
            const result = response.result, // 검색 결과의 컨테이너
                items = result.items, // 검색 결과의 배열
                point = items.point; // 검색 결과의 좌표
            
            // 좌표를 businessLocation local state에 저장하기
            Object.entries(point).forEach(([key, value]) => {
                setBusinessLocation({
                    ...businessLocation,
                    [key]: value
                });
            });
        });
    };

    /**
     * 사업장 가입하기 클립하면 
     * 1) getLatLngFromAddress를 먼저 발동하고
     * 2) 우리 API Call을 하기.
     * @param event 
     */
    const createBusinessClick = (event): void => {
        getLatLngFromAddress(props.businessLocation.jibeon);
        apiCall();
        event.preventDefault();
    };


    /**
     * 사업장 + 사업장 주소 저장하는 API Call 
     * 1) 사업장을 먼저 만들고 (business.py: access at /owners/<id>/business/)
     * 2) 사업장 주소를 저장한다 (business_map.py: access at /map/<id>).
     * @param event 
     */

    const apiCall = (): void => {
        props.createBusiness(
            api,
            props.user.id,
            business
        );
        props.createBusinessLocation(
            api,
            businessLocation
        ).then(() => {
            history.push(UrlPaths.Home)
        });
    };

    return (
        <div className="background">
            <CreateBusinessForm 
                business={business}
                businessLocation={businessLocation}
                businessInformationInput={businessInformationInput}
                businessLocationInput={businessLocationInput}
                createBusinessClick={createBusinessClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createBusiness: (
            api: KouponBankApi,
            userId: string,
            business: Business,
        ) => {
            return createBusiness(api, userId, business, dispatch);
        },
        createBusinessLocation: (
            api: KouponBankApi,
            businessLocation: BusinessLocation,
        ) => {
            return createBusinessLocation(api, businessLocation, dispatch)
        }
    };
};

export const CreateBusinessPageR = connect(mapStateToProps, mapDispatchToProps)(CreateBusinessPage);