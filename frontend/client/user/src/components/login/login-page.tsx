import "./login.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer } from "../../store/reducer";
import { loginUser } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBar } from "../common-components/navigation/navigation-bar";
import { Notifications } from "../common-components/notifications/notifications";
import { LoginForm } from "./login-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginUser: (api: KouponBankApi, user: User) => Promise<void>;
    user: User;
    userDetail: UserDetail;
    alertState: AlertState;
}

export const LoginPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const alert = props.alertState.alert;
    const history = useHistory();
    const [user, setUser] = useState(props.user);
    const [showAlert, setShowAlert] = useState(true);

    const userLoginInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUser({
            ...user,
            [target.name]: target.value,
        });
    };

    const loginUserClick = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .loginUser(api, user)
            .then(() => {
                history.push(UrlPaths.HomePage);
            })
            .catch(() => {
                // Nothing here for now
            });
        event.preventDefault();
    };

    const directToSignUpPageClick = (): void => {
        history.push(UrlPaths.SignUpPage);
    };

    return (
        <div id="login-page">
            <NavBar />
            <LoginForm
                directToSignUpPageClick={directToSignUpPageClick}
                user={user}
                userLoginInput={userLoginInput}
                loginUserClick={loginUserClick}
            />
            <Notifications
                onClose={() => {
                    setShowAlert(false);
                }}
                showAlert={showAlert}
                displayAlert={alert.displayAlert}
                alertType={alert.alertType}
                alertHeader={alert.alertHeader}
                alertBody={alert.alertBody}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        alertState: state.notificationReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginUser: async (api: KouponBankApi, user: User) => {
            return loginUser(api, user, dispatch);
        },
    };
};

export const LoginPageR = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
