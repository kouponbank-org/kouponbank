import React, { useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBar } from "../navigation/navigation-bar";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
};

export const HomePage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();

    const clickLoginButton = (event): void => {
        history.push(UrlPaths.Login);
    };

    const clickUserProfileButton = (event): void => {
        history.push(UrlPaths.UserProfile)
    };

    return (
        <div>
            <NavBar
                title={"쿠폰뱅크"}
                buttonName={ props.user.username === ("") ? "로그인" : "나만의 공간"}
                onClick={ props.user.username === ("") ? clickLoginButton : clickUserProfileButton }
            />
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.userReducer.user
    };
};

export const HomePageR = connect(mapStateToProps)(HomePage);