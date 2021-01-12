import "./business-page.scss";

import React from "react";
import { connect } from "react-redux";

import { Business } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { TopNavBar } from "../common-components/navigation/navigation-top-bar";
import { BusinessPageForm } from "./business-page-form";

interface Prop {
    business: Business;
}

export const BusinessPage: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="kb-business-page">
            <TopNavBar />
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
