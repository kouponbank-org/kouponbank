import "./business-page.scss";

import React from "react";
import { connect } from "react-redux";

import { Business } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { TopNavBarR } from "../navigation/navigation-top-bar";
import { BusinessPageForm } from "./business-page-form";

interface Prop {
    business: Business;
}

export const BusinessPage: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="kb-business-page">
            <TopNavBarR title="Business Title Goes Here" />
            <BusinessPageForm business={props.business} />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        business: state.businessReducer.business,
    };
};

/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};
*/

export const BusinessPageR = connect(mapStateToProps, null)(BusinessPage);
