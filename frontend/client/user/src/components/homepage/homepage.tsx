import "./homepage.scss";

import React from "react";
import { connect } from "react-redux";

import { Business, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { TopNavBar } from "../common-components/navigation/navigation-top-bar";
import { HomepageForm } from "./homepage-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    business: Business;
    businesses: Business[];
}

export const HomePage: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="homepage">
            <TopNavBar />
            <HomepageForm />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
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
