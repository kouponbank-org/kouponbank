import "./business-page.scss";

import React from "react";
import { connect } from "react-redux";

import { Business, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { NavBar } from "../common-components/navigation/navigation-bar";
import { BusinessPageForm } from "./business-page-form";

interface Prop {
    business: Business;
    user: User;
}

export const BusinessPage: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="kb-business-page">
            <NavBar user={props.user} />
            <BusinessPageForm business={props.business} />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
    };
};

/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};
*/

export const BusinessPageR = connect(mapStateToProps, null)(BusinessPage);
