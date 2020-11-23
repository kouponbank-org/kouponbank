import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Coupon, Owner } from "../../api/kb-types";
import { updateBusiness } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { BusinesspageForm } from "./business-page-form";
import "./business-page.scss";

export interface Prop {
    business: Business;
    owner: Owner;
    coupon: Coupon;
    updateBusiness: (
        api: KouponBankApi,
        userId: string,
        businessId: string,
        business: Business,
    ) => void;
}

export const BusinessPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const [businessInfo, setBusinessInfo] = useState(props.business);

    const editDetails = (event): void => {
        setBusinessInfo({
            ...businessInfo,
            [event.target.name]: event.target.value,
        });
    };

    const submitChange = (event: React.MouseEvent<HTMLElement>): void => {
        props.updateBusiness(api, props.owner.id, props.business.id, businessInfo);
        event.preventDefault();
    };

    return (
        <div className="business-page">
            <NavBarR />
            <BusinesspageForm
                businessInput={businessInfo}
                business={props.business}
                editDetails={editDetails}
                submitChange={submitChange}
                coupon={props.coupon}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        owner: state.ownerReducer.owner,
        business: state.businessReducer.business,
        coupon: state.couponReducer.coupon,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateBusiness: async (
            api: KouponBankApi,
            userId: string,
            businessId: string,
            business: Business,
        ) => {
            return updateBusiness(api, userId, businessId, business, dispatch);
        },
    };
};

export const BusinessPageR = connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
