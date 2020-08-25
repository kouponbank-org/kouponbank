import React, { useContext } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { ApiContext } from "../base-page-router";
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
        history.push("/login");
    };

    const clickUserProfileButton = (event): void => {
        history.push("/userprofile")
    };

    return (
        <div>
            <NavBar
                username={props.user.username}
                title={"Homepage"}
                buttonName={ props.user.username === ("") ? "Login" : "User Profile"}
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