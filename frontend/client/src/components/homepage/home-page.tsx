import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Business, BusinessLocation, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { HomepageForm } from "./home-page-form";
import "./homepage.scss";
import { OwnerHomepageForm } from "./owner-home-page-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    isOwner: boolean;
    coupon: Coupon;
    business: Business;
    businessLocation: BusinessLocation;
    businesses: Business[];
    selectBusiness: (business) => void;
}

export const HomePage: React.FC<Prop> = (props: Prop) => {
    //const api = useContext<KouponBankApi>(ApiContext);
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

    return (
        <div>
            <NavBarR title={"쿠폰뱅크"} buttonName={"로그인"} onClick={directToUserLogin} />
            {props.isOwner ? (
                <OwnerHomepageForm
                    coupon={props.coupon}
                    businesses={props.businesses}
                    business={props.business}
                    businessLocation={props.businessLocation}
                    selectBusiness={props.selectBusiness}
                    couponClick={couponClick}
                    businessClick={businessClick}
                />
            ) : (
                <HomepageForm
                    coupon={props.coupon}
                    couponClick={couponClick}
                    businesses={props.businesses}
                    selectBusiness={props.selectBusiness}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        isOwner: state.userReducer.isOwner,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
        businessLocation: state.businessReducer.businessLocation,
    };
};
/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}*/

export const HomePageR = connect(mapStateToProps)(HomePage);
