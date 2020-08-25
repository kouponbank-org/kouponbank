// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components
import { HomePageLoginButton } from "./home-page-login-button"

// API Components
import { ApiContext } from "../base-page-router";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";

// Material UI Components

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

    return (
        <div>
            {
                !props.user ?
                <HomePageLoginButton 
                    clickLoginButton={clickLoginButton}
                /> :props.user.username
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
};

export const HomePageR = connect(mapStateToProps)(HomePage);