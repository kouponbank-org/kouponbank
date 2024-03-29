import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../../api/kb-api";
import {
    AddressDetail,
    Business,
    BusinessAddress,
    BusinessDetail,
    Owner,
} from "../../../api/kb-types";
import {
    createBusiness,
    initialState as BusinessReducerInitialState,
} from "../../../store/business/business-reducer";
import { RootReducer } from "../../../store/reducer";
import { ApiContext } from "../../base-page-router";
import { TopNavBarR } from "../../navigation/navigation-bar";
import { CreateBusinessForm } from "./create-business-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createBusiness: (
        api: KouponBankApi,
        userId: string,
        business: Business,
        businessDetail: BusinessDetail,
        businessAddress: BusinessAddress,
    ) => Promise<Business>;
    owner: Owner;
    business: Business;
}

export const CreateBusinessPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [business, setBusiness] = useState<Business>(BusinessReducerInitialState.business);
    const [businessDetail, setBusinessDetail] = useState<BusinessDetail>(props.business.business_detail)
    const [businessAddress, setBusinessAddress] = useState<BusinessAddress>(props.business.business_address);

    // 사업장 정보 (이름, 이메일)
    const businessCreateInput = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setBusiness({
            ...business,
            [target.name]: target.value,
        });
    };

    const businessDetailCreateInput = (event: React.FormEvent<HTMLInputElement>): void => {
        const target = event.target as HTMLInputElement;
        setBusinessDetail({
            ...businessDetail,
            [target.name]: target.value,
        });
    };

    // 사업장 주소 (도로명, 지번, 우편번호, 좌표)
    const handleSelectAddressClick = (address: AddressDetail, addressCoord: AddressDetail): void => {
        setBusinessAddress({
            ...businessAddress,
            jibunAddr: address.jibunAddr,
            roadAddr: address.roadAddr,
            zipNo: address.zipNo,
            entX: addressCoord.entX,
            entY: addressCoord.entY,
        });
    };

    const createBusiness = (): void => {
        props
            .createBusiness(api, props.owner.id, business, businessDetail, businessAddress)
            .then((business) => {
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
                businessDetail={businessDetail}
                businessAddress={businessAddress}
                businessCreateInput={businessCreateInput}
                businessDetailCreateInput={businessDetailCreateInput}
                handleSelectAddressClick={handleSelectAddressClick}
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
        createBusiness: async (
            api: KouponBankApi,
            userId: string,
            business: Business,
            businessDetail: BusinessDetail,
            businessAddress: BusinessAddress,
        ) => {
            return createBusiness(
                api,
                userId,
                business,
                businessDetail,
                businessAddress,
                dispatch
            );
        },
    };
};

export const CreateBusinessPageR = connect(mapStateToProps, mapDispatchToProps)(CreateBusinessPage);
