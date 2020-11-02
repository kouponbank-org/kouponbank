import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { updateBusiness } from "../../store/business/business-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { Dispatch } from "redux";
import { User, Business, BusinessLocation } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { NavBarR } from "../navigation/navigation-bar";
import { BusinesspageForm } from "./business-page-form";
import "./business-page.scss";


interface Prop {
    business: Business;
    user: User;
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

    console.log(props.business)
    return (
        <div className="business-page">
            <NavBarR/>
            <BusinesspageForm
                temp={businessInfo}
                business={props.business}
                editDetails={editDetails}
                submitChange={submitChange}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
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


  
