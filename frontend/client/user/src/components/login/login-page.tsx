import "./login.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Business, User, UserDetail } from "../../api/kb-types";
import { getBusinesses } from "../../store/business/business-reducer";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer } from "../../store/reducer";
import { getUserDetail } from "../../store/user/user-detail-reducer";
import { loginUser } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBar } from "../navigation/navigation-top-bar";
import { Notifications } from "../notifications/notifications";
import { LoginForm } from "./login-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginUser: (api: KouponBankApi, user: User) => Promise<User>;
    getUserDetail: (api: KouponBankApi, id: string) => void;
    getBusinesses: (api: KouponBankApi) => Promise<Business[]>;
    user: User;
    userDetail: UserDetail;
    alertState: AlertState;
}

export const LoginPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const alert = props.alertState.alert;
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [showAlert, setShowAlert] = useState(true);

    const userCredentialsInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUserCredentials({
            ...userCredentials,
            [target.name]: target.value,
        });
    };

    const loginUserClick = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .loginUser(api, userCredentials)
            .then((user) => {
                props.getUserDetail(api, user.id);
                props
                    .getBusinesses(api)
                    .then(() => {
                        history.push(UrlPaths.HomePage);
                    })
                    .catch(() => {
                        // Currently does nothing
                    });
            })
            .catch(() => {
                // Currently does nothing
            });
        event.preventDefault();
    };

    const signUpClick = (): void => {
        history.push(UrlPaths.SignUpPage);
    };

    return (
        <div className="background">
            <TopNavBar />
            <LoginForm
                signUpClick={signUpClick}
                userCredentials={userCredentials}
                userCredentialsInput={userCredentialsInput}
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
        userDetail: state.userDetailReducer.userDetail,
        alertState: state.notificationReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginUser: async (api: KouponBankApi, user: User) => {
            return loginUser(api, user, dispatch);
        },
        getUserDetail: async (api: KouponBankApi, id: string) => {
            return getUserDetail(api, id, dispatch);
        },
        getBusinesses: async (api: KouponBankApi) => {
            return getBusinesses(api, dispatch);
        },
    };
};

export const LoginPageR = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
