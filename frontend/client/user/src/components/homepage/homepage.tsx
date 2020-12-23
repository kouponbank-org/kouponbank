import "./homepage.scss";

import React from "react";
import { connect } from "react-redux";

import { Business, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { BottomNavBar } from "../navigation/navigation-bottom-bar";
import { TopNavBarR } from "../navigation/navigation-top-bar";
import { HomepageForm } from "./homepage-form";

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
    return (
        <div className="homepage">
            <TopNavBarR title={"Koupon Bank"} />
            <HomepageForm />
            <BottomNavBar />
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
