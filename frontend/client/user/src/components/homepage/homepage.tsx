import React, { useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Coupon, User } from "../../api/kb-types";
import { getBusiness } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { HomepageForm } from "./homepage-form";
import "./homepage.scss";


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    isUser: Boolean;
    coupon: Coupon;
    business: Business;
    businesses: Business[];
    getBusiness: (
        api: KouponBankApi,
        businessId: string,
    ) => Promise<Business>;
};

export const HomePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    
    const toUserLoginPage = (): void => {
        history.push(UrlPaths.LoginPage);
    };

    const selectBusiness = (businessId) => {
        props.getBusiness(api, businessId);
        history.push(`/business/${businessId}`);
    }
    
    return (
        <div>
            <NavBarR
                title={"Koupon Bank"} 
                buttonName={"Login"} 
                onClick={toUserLoginPage}
            />
            <HomepageForm
                businesses= {props.businesses}
                selectBusiness= {selectBusiness}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getBusiness: (
            api: KouponBankApi,
            businessId: string,
        ) => {
            return getBusiness(api, businessId, dispatch);
        },
    }
}

export const HomePageR = connect(mapStateToProps, mapDispatchToProps)(HomePage);
