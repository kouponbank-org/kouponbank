import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { loginUser } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { LoginForm } from "./login-form";
import './login.scss';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginUser: (
        api: KouponBankApi,
        username: string,
        password: string | number,
        email: string | number,
    ) => Promise<void>;
    user: User;
};

export const UserLoginPage = (props: Prop) => {
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
        props.loginUser(
            api,
            userCredentials.username,
            userCredentials.password,
            userCredentials.email
        )
        .then(() => {
            history.push(UrlPaths.Home)
        });
        event.preventDefault();
    }

    const toOwnerLoginClick = (event): void => {
        history.push(UrlPaths.OwnerLogin)
    }

    const ownerSignUpClick = (event): void => {
        history.push(UrlPaths.OwnerSignUp);
    };

    const userSignUpClick = (event): void => {
        history.push(UrlPaths.UserSignUp);
    };

    return (
        <div className="background">
            <NavBarR 
                title={"Login Page"}
                buttonName={"사업자 로그인하기"}
                onClick={toOwnerLoginClick}
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

const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        user: state.userReducer.user
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginUser: (
            api: KouponBankApi,
            username: string,
            password: string | number,
            email: string | number,
        ) => {
            return loginUser(api, username, password, email, dispatch);
        }
    };
};

export const UserLoginPageR = connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);