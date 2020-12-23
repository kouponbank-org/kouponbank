import React, { Fragment, ReactElement, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer, signOut } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { NavTab } from "react-router-tabs";
//import { SearchBusinessR } from "./business/business-search";
import "./navigation-bar.scss";

export interface Prop {
    user?: User;
    userDetail?: UserDetail;
    title?: string;
    buttonName?: string;
    signOut?: () => void;
}

export const TopNavBar = (props: Prop): ReactElement => {
    const history = useHistory();

    const redirectToHomepage = (event: React.MouseEvent<HTMLElement>): void => {
        history.push(UrlPaths.HomePage);
        event.preventDefault();
    };

    const signOut = () => {
        props.signOut();
        history.push(UrlPaths.HomePage);
    };

    return (
        <div className="nav-bar">
            <img
                className="homepage-button"
                src="/kouponbank.jpg"
                onClick={redirectToHomepage}
            />
            <div className="title">{props.title}</div>
            { // logout should only show when the user is logged in
                props.user.id ? 
                <button className="logout" onClick={signOut}>
                    Sign Out
                </button>
            : "" }
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signOut: () => {
            return signOut(dispatch);
        },
    };
};

export const TopNavBarR = connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
