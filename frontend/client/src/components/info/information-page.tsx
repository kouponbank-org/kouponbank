import React from "react";
import { connect } from "react-redux";
import { RootReducer } from "../../store/reducer";
import "./information.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {}

export const HomePage: React.FC<Prop> = () => {
    //const api = useContext<KouponBankApi>(ApiContext);

    return (
        <div></div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {};
};
/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}*/

export const HomePageR = connect(mapStateToProps)(HomePage);
