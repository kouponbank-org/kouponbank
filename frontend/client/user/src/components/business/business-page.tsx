import React from "react";
import { connect } from "react-redux";
import { Business, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { NavBarR } from "../navigation/navigation-bar";
import { BusinesspageForm } from "./business-page-form";
import "./business-page.scss";


interface Prop {
    business: Business;
    user: User;
    coupon: Coupon;
}


export const BusinessPage = (props: Prop) =>  {
    return (
        <div className="business-page">
            <NavBarR/>
            <BusinesspageForm
                business={props.business}
                coupon={props.coupon}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
        coupon: state.couponReducer.coupon,
    };
};
/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};
*/
export const BusinessPageR = connect(mapStateToProps, null)(BusinessPage);


  