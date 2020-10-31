import React from "react";
import { connect } from "react-redux";
import { Business } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";

interface Prop {
    business: Business;
}

const BusinessPage: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="business-page">
            Current Business Page:
            {props.business.id}
            {props.business.business_name}
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

};*/

export const BusinessPageR = connect(mapStateToProps)(BusinessPage);
