import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../../api/kb-api";
import { AddressDetail, Business, Owner } from "../../../api/kb-types";
import {
    createBusiness,
    getOwnerBusinesses,
    initialState as BusinessReducerInitialState
} from "../../../store/business/business-reducer";
import { RootReducer } from "../../../store/reducer";
import { ApiContext } from "../../base-page-router";
import { TopNavBarR } from "../../navigation/navigation-bar";
import { CreateBusinessForm } from "./create-business-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createBusiness: (api: KouponBankApi, userId: string, business: Business) => Promise<Business>;
    getOwnerBusinesses: (api: KouponBankApi, userid: string) => void;
    owner: Owner;
    business: Business;
}

export const CreateBusinessPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [business, setBusiness] = useState(BusinessReducerInitialState.business);

    // 사업장 정보 (이름, 이메일)
    const businessInformationInput = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setBusiness({
            ...business,
            [target.name]: target.value,
        });
    };

    // 사업장 주소 (도로명, 지번, 우편번호, 좌표)
    const setBusinessAddress = (address: AddressDetail, addressCoord: AddressDetail): void => {
        setBusiness({
            ...business,
            jibunAddr: address.jibunAddr,
            roadAddr: address.roadAddr,
            zipNo: address.zipNo,
            entX: addressCoord.entX,
            entY: addressCoord.entY,
        });
    };

    const createBusiness = (): void => {
        props
            .createBusiness(api, props.owner.id, business)
            .then((business) => {
                props.getOwnerBusinesses(api, props.owner.id);
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    /**
     * 사업장 가입하기 클릭하면
     * 2) 우리 API Call을 하기.
     * @param event
     */
    const createBusinessClick = (event: React.FormEvent<HTMLFormElement>): void => {
        createBusiness();
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
            <TopNavBarR title={"Business"} />
            <CreateBusinessForm
                business={business}
                businessInformationInput={businessInformationInput}
                setBusinessAddress={setBusinessAddress}
                createBusinessClick={createBusinessClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        owner: state.ownerReducer.owner,
        business: state.businessReducer.business,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createBusiness: async (api: KouponBankApi, userId: string, business: Business) => {
            return createBusiness(api, userId, business, dispatch);
        },
        getOwnerBusinesses: async (api: KouponBankApi, userId: string) => {
            return getOwnerBusinesses(api, userId, dispatch);
        },
    };
};

export const CreateBusinessPageR = connect(mapStateToProps, mapDispatchToProps)(CreateBusinessPage);
