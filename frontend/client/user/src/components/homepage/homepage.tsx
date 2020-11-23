import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Business, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { HomepageForm } from "./homepage-form";
import "./homepage.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    coupon: Coupon;
    business: Business;
    businesses: Business[];
}

export const HomePage: React.FC<Prop> = (props: Prop) => {
    const history = useHistory();

    const toUserLoginPage = (): void => {
        history.push(UrlPaths.LoginPage);
    };

    return (
        <div>
            <NavBarR title={"Koupon Bank"} buttonName={"Login"} onClick={toUserLoginPage} />
            <HomepageForm />
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

/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};
*/

export const HomePageR = connect(mapStateToProps, null)(HomePage);
