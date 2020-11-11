import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { KouponBankApi } from "../../api/kb-api";
import { updateBusiness } from "../../store/business/business-reducer";
import { ApiContext } from "../base-page-router";
import { Dispatch } from "redux";
import { User, Business, Coupon } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { NavBarR } from "../navigation/navigation-bar";
import { BusinesspageForm } from "./business-page-form";
import "./business-page.scss";


interface Prop {
    business: Business;
    user: User;
    isUser: Boolean;
    coupon: Coupon;
    updateBusiness: (
        api: KouponBankApi,
        userId: string,
        businessId: string,
        business: Business,
    ) => Promise<Business>;
}


export const BusinessPage = (props: Prop) =>  {
    const api = useContext<KouponBankApi>(ApiContext);
    const [businessInfo, setBusinessInfo] = useState(props.business);
    const editDetails = (event): void => {
        setBusinessInfo({
            ...businessInfo,
            [event.target.name]: event.target.value
        });
    };

    const submitChange = (event): void => {
        props.updateBusiness(api,
                               props.user.id,
                               props.business.id,
                               businessInfo
                               )
        event.preventDefault();
    };

    return (
        <div className="business-page">
            <NavBarR/>
            {
                 props.isUser===false ? (
                    <BusinesspageForm
                        isUser={props.isUser}
                        businessInput={businessInfo}
                        business={props.business}
                        editDetails={editDetails}
                        submitChange={submitChange}
                        coupon={props.coupon}
                    />
                ) : (
                    <BusinesspageForm
                        isUser={props.isUser}
                        business={props.business}
                        coupon={props.coupon}
                    />
                )
            }
            
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        isUser: state.userReducer.isUser,
        business: state.businessReducer.business,
        coupon: state.couponReducer.coupon,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateBusiness: (
            api: KouponBankApi,
            userId: string,
            businessId: string,
            business: Business,
        ) => {
            return updateBusiness(api, userId, businessId, business, dispatch)
        }    
    };
};

export const BusinessPageR = connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
