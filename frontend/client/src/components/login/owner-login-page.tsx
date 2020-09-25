import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { AlertState } from "../../store/notification/notification-reducer";
import { loginOwner } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { LoginForm } from "./login-form";
import './login.scss';
 
/* Represents the required properties of the HomePage.
 */
export interface Prop {
    loginOwner: (
        api: KouponBankApi,
        username: string,
        password: string | number,
        email: string | number,
    ) => Promise<void>;
    user: User;
    alertState: AlertState;
};

export const OwnerLoginPage = (props: Prop) => {
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [showAlert, setShowAlert] = useState(true);
    const history = useHistory();
    const api = useContext<KouponBankApi>(ApiContext);
    const alert = props.alertState.alert
    
    const userCredentialsInput = (event): void => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value
        });
    }

    const loginUserClick = (event): void => {
        props.loginOwner(
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

    const toUserLoginClick = (event): void => {
        history.push(UrlPaths.UserLogin)
    }


    return (
        <div className="background">
            <NavBarR 
                title={"Login Page"}
                buttonName={"유저 로그인하기"}
                onClick={toUserLoginClick}
            />
            <Notifications
                onClose={() => {setShowAlert(false)}}
                showAlert={showAlert}
                displayAlert={alert.displayAlert}
                alertType={alert.alertType}
                alertHeader={alert.alertHeader}
                alertBody={alert.alertBody}
            />
            <LoginForm
                userCredentials={userCredentials}
                userCredentialsInput={userCredentialsInput}
                loginUserClick={loginUserClick}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        alertState: state.notificationReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginOwner: (
            api: KouponBankApi,
            username: string,
            password: string | number,
            email: string | number,
        ) => {
            return loginOwner(api, username, password, email, dispatch);
        }
    };
};

export const OwnerLoginPageR = connect(mapStateToProps, mapDispatchToProps)(OwnerLoginPage);