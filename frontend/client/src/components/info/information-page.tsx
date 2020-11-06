import React from "react";
import { connect } from "react-redux";
import { RootReducer } from "../../store/reducer";
import "./information.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

}

export const HomePage: React.FC<Prop> = (props: Prop) => {
    //const api = useContext<KouponBankApi>(ApiContext);

    return (
        <div>
            
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
    };
};
/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}*/

export const HomePageR = connect(mapStateToProps)(HomePage);
