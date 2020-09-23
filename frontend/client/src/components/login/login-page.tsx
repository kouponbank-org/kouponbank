import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBar } from "../navigation/navigation-bar";
import { LoginForm } from "./login-form";
import './login.scss';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
};

export const LoginPage = (props: Prop) => {
    const [userCredentials, setUserCredentials] = useState(props.user);
    const history = useHistory();
    const api = useContext<KouponBankApi>(ApiContext);
    
    const userCredentialsInput = (event): void => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value
        });
    }

    const loginUserClick = (event): void => {
        // does not make calls to API atm.
        history.push(UrlPaths.Home)
        event.preventDefault();
    }

    const ownerSignUpClick = (event): void => {
        history.push(UrlPaths.OwnerSignUp);
    };

    const userSignUpClick = (event): void => {
        history.push(UrlPaths.UserSignUp);
    };

    return (
        <div className="background">
            <NavBar 
                title={"Login Page"}
            />
            <LoginForm
                userSignUpClick={userSignUpClick}
                ownerSignUpClick={ownerSignUpClick}
                userCredentials={userCredentials}
                userCredentialsInput={userCredentialsInput}
                loginUserClick={loginUserClick}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
};

const mapDispatchToProps = dispatch => {

};

export const LoginPageR = connect(mapStateToProps, mapDispatchToProps)(LoginPage);