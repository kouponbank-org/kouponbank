import "./navigation-bar.scss";

import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { User } from "../../api/kb-types";
import { RootReducer, signOut } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";

export interface Prop {
    user: User;
    signOut: () => void;
}

export const KouponBankSideTabBar = (props: Prop): ReactElement => {
    const history = useHistory();

    const signOut = () => {
        if (props.user.id) {
            props.signOut();
            history.push(UrlPaths.HomePage);
        }
    };

    const redirectToHomepage = (event: React.MouseEvent<HTMLImageElement>): void => {
        history.push(UrlPaths.HomePage);
        event.preventDefault();
    };

    const redirectToPage = (event: React.MouseEvent<HTMLImageElement>) => {
        const target = event.currentTarget;
        history.push(`/${target.alt}`);
    };

    return (
        <div id="nav-side-tab-container">
            <div id="homepage-button-container">
                <div id="homepage-padding-control-container">
                    <img id="homepage-button" src="/kouponbank.jpg" onClick={redirectToHomepage} />
                </div>
            </div>
            <div id="navigation-container">
                <div className="navigation-margin-control-container">
                    <div className="navigation-button-container">
                        <img
                            className="navigation-button"
                            src="/side-nav-menu.png"
                            alt="kblogin"
                            onClick={redirectToPage}
                        />
                    </div>
                </div>
                <div className="navigation-margin-control-container">
                    <div className="navigation-button-container">
                        <img
                            className="navigation-button"
                            src="/side-nav-search.png"
                            alt="kbsignup"
                            onClick={redirectToPage}
                        />
                    </div>
                </div>
                <div className="navigation-margin-control-container">
                    <div className="navigation-button-container">
                        <img
                            className="navigation-button"
                            src="/side-nav-favorite.png"
                            alt="discover"
                            onClick={redirectToPage}
                        />
                    </div>
                </div>
                <div className="navigation-margin-control-container">
                    <div className="navigation-button-container">
                        <img
                            className="navigation-button"
                            src="/side-nav-calendar.png"
                            alt="kbprofile"
                            onClick={redirectToPage}
                        />
                    </div>
                </div>
                <div className="navigation-margin-control-container">
                    <div className="navigation-button-container">
                        <img
                            className="navigation-button"
                            src="/side-nav-profile.png"
                            alt="info"
                            onClick={redirectToPage}
                        />
                    </div>
                </div>
                <div className="navigation-margin-control-container">
                    <div className="navigation-button-container">
                        <button className="logout" onClick={signOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
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

export const KouponBankSideTabBarR = connect(
    mapStateToProps,
    mapDispatchToProps,
)(KouponBankSideTabBar);
