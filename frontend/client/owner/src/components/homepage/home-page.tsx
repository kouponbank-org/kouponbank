import React, { useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Coupon, Owner } from "../../api/kb-types";
import { getOwnerBusiness } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { HomepageForm } from "./homepage-form";
import "./homepage.scss";


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    owner: Owner;
    coupon: Coupon;
    business: Business;
    businesses: Business[];
    getOwnerBusiness: (
        api: KouponBankApi,
        userId: string,
        businessId: string,
    ) => Promise<Business>;
};

export const HomePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();

    const directToUserLogin = (): void => {
        history.push(UrlPaths.LoginPage);
    };

    const couponClick = (): void => {
        history.push(UrlPaths.CreateCouponPage);
    };

    const businessClick = (): void => {
        history.push(UrlPaths.CreateBusinessPage);
    };

    const selectBusiness = (businessId) => {
        props.getOwnerBusiness(api, props.owner.id, businessId);
        history.push(`/business/${businessId}`);
    }
    
    return (
        <div>
            <NavBarR
                title={"Koupon Bank"} 
                buttonName={"Login"} 
                onClick={directToUserLogin}
            />
            <HomepageForm
                coupon={props.coupon}
                businesses={props.businesses}
                business={props.business}
                couponClick={couponClick}
                businessClick={businessClick}
                selectBusiness={selectBusiness}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        owner: state.ownerReducer.owner,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getOwnerBusiness: (
            api: KouponBankApi,
            userId: string,
            businessId: string,
        ) => {
            return getOwnerBusiness(api, userId, businessId, dispatch);
        },
    }
}

export const HomePageR = connect(mapStateToProps, mapDispatchToProps)(HomePage);
