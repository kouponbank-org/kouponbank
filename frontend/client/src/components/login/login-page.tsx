import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer } from "../../store/reducer";
import { loginOwner, loginUser } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { LoginForm } from "./login-form";
import './login.scss';


import { getUserDetail, getOwnerDetail } from "../../store/user/user-detail-reducer";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginUser: (
        api: KouponBankApi,
        user: User
    ) => Promise<User>;
    loginOwner: (
        api: KouponBankApi,
        user: User,
    ) => Promise<User>;
    getUserDetail: (
        api: KouponBankApi,
        id: string,
    ) => Promise<void>;
    getOwnerDetail: (
        api: KouponBankApi,
        id: string,
    ) => Promise<void>;
    
    user: User;
    userDetail: UserDetail;
    alertState: AlertState;
};

export const LoginPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const alert = props.alertState.alert
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [isUser, setIsUser] = useState(true);
    const [showAlert, setShowAlert] = useState(true);

    const userCredentialsInput = (event): void => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value
        });
    }

    const loginUserClick = (event): void => {
        isUser === true ? (
            props.loginUser(
                api,
                userCredentials
            )
            .then((user) => {
                props.getUserDetail(api, user.id)
            .then(() => {
                history.push(UrlPaths.Home);
            })
        })
        ) : (
            props.loginOwner(
                api,
                userCredentials,
            )
            .then((user) => {
                props.getOwnerDetail(api, user.id)
            .then(() => {
                history.push(UrlPaths.Home)
            })
        })
        )
        event.preventDefault();
    };
    

    const toUserOrOwnerLoginClick = (): void => {
        isUser === true ? setIsUser(false) : setIsUser(true);
    };

    const signUpClick = (event): void => {
        history.push(UrlPaths.SignUpPage);
    };

    return (
        <div className="background">
            <NavBarR 
                title={"Login Page"}
                buttonName={isUser === true ? "사업자 로그인하기" : "소비자 로그인하기"}
                onClick={toUserOrOwnerLoginClick}
            />
            {
                isUser === true ? (
                    <LoginForm
                        signUpClick={signUpClick}
                        userCredentials={userCredentials}
                        userCredentialsInput={userCredentialsInput}
                        loginUserClick={loginUserClick}
                    />
                ) : (
                    <LoginForm
                        userCredentials={userCredentials}
                        userCredentialsInput={userCredentialsInput}
                        loginUserClick={loginUserClick}
                    />
                )
            }
            <Notifications
                onClose={() => {setShowAlert(false)}}
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
    console.log(state)
    return {
        user: state.userReducer.user,
        userDetail: state.userDetailReducer.userDetail,
        alertState: state.notificationReducer
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginUser: (
            api: KouponBankApi,
            user: User
        ) => {
            return loginUser(api, user, dispatch);
        },
        loginOwner: (
            api: KouponBankApi,
            user: User
        ) => {
            return loginOwner(api, user, dispatch);
        }, 
        getUserDetail: (
            api: KouponBankApi,
            id: string
        ) => {
            return getUserDetail(api, id, dispatch);
        },
        getOwnerDetail: (
            api: KouponBankApi,
            id: string
        ) => {
            return getOwnerDetail(api, id, dispatch);
        }, 
    };
};

export const LoginPageR = connect(mapStateToProps, mapDispatchToProps)(LoginPage);