import React, { useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, BusinessLocation, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { HomepageForm } from "./home-page-form";
import "./homepage.scss";
import { OwnerHomepageForm } from "./owner-home-page-form";



/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    isOwner: Boolean;
    coupon: Coupon;
    business: Business;
    businessLocation: BusinessLocation;
};

export const HomePage = (props: Prop) => {
    const history = useHistory();

    const directToUserLogin = (event): void => {
        history.push(UrlPaths.Login);
    }

    const couponClick = (event): void => {
        history.push(UrlPaths.CreateCoupon);
    };

    const businessClick = (event): void => {
        history.push(UrlPaths.CreateBusiness);
    };
    
    return (
        <div>
            <NavBarR
                title={"쿠폰뱅크"}
                buttonName={"로그인"}
                onClick={directToUserLogin}
            />
            {
                props.isOwner==true ? (
                    <OwnerHomepageForm
                        coupon={props.coupon}
                        business={props.business}
                        businessLocation={props.businessLocation}
                        couponClick={couponClick}
                        businessClick={businessClick}
                    />
                ) : (
                    <HomepageForm
                        coupon={props.coupon}
                        couponClick={couponClick}
                    />
                )
            }
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        isOwner: state.userReducer.isOwner,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businessLocation: state.businessReducer.businessLocation,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}

export const HomePageR = connect(mapStateToProps, mapDispatchToProps)(HomePage);