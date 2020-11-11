import React, { useContext } from "react";
import { connect } from "react-redux";
import { KouponBankApi } from "../../api/kb-api";
import { useHistory } from "react-router-dom";
import { Business, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Dispatch } from "redux";
import { HomepageForm } from "./home-page-form";
import "./homepage.scss";
import { OwnerHomepageForm } from "./owner-home-page-form";
import { getOwnerBusiness } from "../../store/business/business-reducer";


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    isUser: Boolean;
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
        history.push(UrlPaths.Login);
    };

    const couponClick = (): void => {
        history.push(UrlPaths.CreateCoupon);
    };

    const businessClick = (): void => {
        history.push(UrlPaths.CreateBusiness);
    };

    const selectBusiness = (businessId) => {
        props.getOwnerBusiness(api, props.user.id, businessId);
        history.push(`/business/${businessId}`);
    }
    
    return (
        <div>
            <NavBarR
                title={"쿠폰뱅크"}
                buttonName={"로그인"}
                onClick={directToUserLogin}
            />
            {
                props.isUser===false ? (
                    <OwnerHomepageForm
                        coupon={props.coupon}
                        businesses = {props.businesses}
                        business={props.business}
                        couponClick={couponClick}
                        businessClick={businessClick}
                        selectBusiness= {selectBusiness}
                    />
                ) : (
                    <HomepageForm
                        businesses= {props.businesses}
                        selectBusiness= {selectBusiness}
                    />
                )
            }
            <div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        isUser: state.userReducer.isUser,
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
