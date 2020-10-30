import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../../api/kb-api";
import { Business, BusinessLocation, Coordinate, User } from "../../../api/kb-types";
import {
    createBusiness,
    createBusinessLocation,
    getMyBusinesses,
    initialState
} from "../../../store/business/business-reducer";
import { RootReducer } from "../../../store/reducer";
import { ApiContext } from "../../base-page-router";
import { NavBarR } from "../../navigation/navigation-bar";
import { CreateBusinessForm } from "./create-business-form";
/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createBusiness: (api: KouponBankApi, userId: string, business: Business) => Promise<Business>;
    createBusinessLocation: (
        api: KouponBankApi,
        businessId: string,
        businessName: string,
        latlng: Coordinate,
        businessLocation: BusinessLocation,
    ) => Promise<void>;
    getMyBusinesses: (api: KouponBankApi, userid: string) => Promise<void>;
    user: User;
    business: Business;
    businessLocation: BusinessLocation;
}
// TODO:
// get Business ID, X, Y values into businessLocation.
export const CreateBusinessPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [business, setBusiness] = useState(props.business);
    const [businessLocation, setBusinessLocation] = useState(props.businessLocation);

    // 사업장 정보 (이름, 이메일)
    const businessInformationInput = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setBusiness({
            ...business,
            [target.name]: target.value,
        });
    };

    // 사업장 주소 (도로명, 지번, 우편번호)
    const businessLocationSet = (address): void => {
        setBusinessLocation(address);
    };

    // 사업장 주소에서 좌표 가져오는 Naver Maps API Call
    const getLatLngFromAddress = (address, getLatLng) => {
        // Param 주소를 가지고 네이버 Geocode를 사용해서
        // 정확한 주소와 좌표를 찾기
        window.naver.maps.Service.geocode({ address: address }, function (status, response) {
            if (status !== window.naver.maps.Service.Status.OK) {
                return alert("주소를 못 찾았습니다");
            }
            getLatLng(response.result.items[0].point);
        });
    };

    const createBusinessAndBusinessLocation = (latlng): void => {
        props
            .createBusiness(api, props.user.id, business)
            .then((business) => {
                props
                    .createBusinessLocation(
                        api,
                        business.id,
                        business.business_name,
                        latlng,
                        businessLocation,
                    )
                    .then(() => {
                        history.push(`/business/${props.business.id}`);
                    })
                    .catch(() => {
                        // Currently does nothing
                    });
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    /**
     * 사업장 가입하기 클립하면
     * 1) getLatLngFromAddress를 먼저 발동하고
     * 2) 우리 API Call을 하기.
     * @param event
     */
    const createBusinessClick = (event: React.FormEvent<HTMLFormElement>): void => {
        getLatLngFromAddress(businessLocation.jibunAddress, function (latlng) {
            createBusinessAndBusinessLocation(latlng);
        });
        setBusiness(initialState.business);
        setBusinessLocation(initialState.businessLocation);
        props.getMyBusinesses(api, props.user.id).catch(() => {
            // Currently does nothing
        });
        event.preventDefault();
    };

    /**
     * 사업장 + 사업장 주소 저장하는 API Call
     * 1) 사업장을 먼저 만들고 (business.py: access at /owners/<id>/business/)
     * 2) 사업장 주소를 저장한다 (business_map.py: access at /map/<id>).
     * @param event
     */
    return (
        <div className="background">
            <NavBarR title={"비즈니스"} />
            <CreateBusinessForm
                business={business}
                businessLocation={businessLocation}
                businessInformationInput={businessInformationInput}
                businessLocationSet={businessLocationSet}
                createBusinessClick={createBusinessClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
        businessLocation: state.businessReducer.businessLocation,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createBusiness: async (api: KouponBankApi, userId: string, business: Business) => {
            return createBusiness(api, userId, business, dispatch);
        },
        createBusinessLocation: async (
            api: KouponBankApi,
            businessId: string,
            businessName: string,
            latlng: Coordinate,
            businessLocation: BusinessLocation,
        ) => {
            return createBusinessLocation(
                api,
                businessId,
                businessName,
                latlng,
                businessLocation,
                dispatch,
            );
        },
        getMyBusinesses: async (api: KouponBankApi, userId: string) => {
            return getMyBusinesses(api, userId, dispatch);
        },
    };
};

export const CreateBusinessPageR = connect(mapStateToProps, mapDispatchToProps)(CreateBusinessPage);
