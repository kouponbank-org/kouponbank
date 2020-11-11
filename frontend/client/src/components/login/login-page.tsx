import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, User, UserDetail } from "../../api/kb-types";
import { getBusinesses, getOwnerBusinesses } from "../../store/business/business-reducer";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer } from "../../store/reducer";
import { getOwnerDetail, getUserDetail } from "../../store/user/user-detail-reducer";
import { loginOwner, loginUser } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { LoginForm } from "./login-form";
import "./login.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginUser: (api: KouponBankApi, user: User) => Promise<User>;
    loginOwner: (api: KouponBankApi, user: User) => Promise<User>;
    getUserDetail: (api: KouponBankApi, id: string) => void;
    getOwnerDetail: (api: KouponBankApi, id: string) => void;
    getBusinesses: (api: KouponBankApi) => Promise<Business[]>;
    getOwnerBusinesses: (api: KouponBankApi, userid: string) => Promise<void>;
    user: User;
    isUser: boolean;
    userDetail: UserDetail;
    alertState: AlertState;
}

export const LoginPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const alert = props.alertState.alert;
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [isUser, setIsUser] = useState(true);
    const [showAlert, setShowAlert] = useState(true);

    const userCredentialsInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUserCredentials({
            ...userCredentials,
            [target.name]: target.value,
        });
    };

    const loginUserClick = (event: React.MouseEvent<HTMLElement>): void => {
        if (isUser) {
            props
                .loginUser(api, userCredentials)
                .then((user) => {
                    props.getUserDetail(api, user.id);
                    props
                        .getBusinesses(api)
                        .then(() => {
                            history.push(UrlPaths.Home);
                        })
                        .catch(() => {
                            // Currently does nothing
                        });
                })
                .catch(() => {
                    // Currently does nothing
                });
        } else {
            props
                .loginOwner(api, userCredentials)
                .then((user) => {
                    props.getOwnerDetail(api, user.id);
                    props
                        .getOwnerBusinesses(api, user.id)
                        .then(() => {
                            history.push(UrlPaths.Home);
                        })
                        .catch(() => {
                            // Currently does nothing
                        });
                })
                .catch(() => {
                    // Currently does nothing
                });
        }
        event.preventDefault();
    };

    const toUserOrOwnerLoginClick = (): void => {
        if (isUser) {
            setIsUser(false);
        } else {
            setIsUser(true);
        }
    };

    const signUpClick = (): void => {
        history.push(UrlPaths.SignUpPage);
    };

    return (
        <div className="background">
            <NavBarR
                title={"Login Page"}
                buttonName={isUser ? "사업자 로그인하기" : "소비자 로그인하기"}
                onClick={toUserOrOwnerLoginClick}
            />
            {isUser ? (
                <LoginForm
                    isUser={isUser}
                    signUpClick={signUpClick}
                    userCredentials={userCredentials}
                    userCredentialsInput={userCredentialsInput}
                    loginUserClick={loginUserClick}
                />
            ) : (
                <LoginForm
                    isUser={isUser}
                    userCredentials={userCredentials}
                    userCredentialsInput={userCredentialsInput}
                    loginUserClick={loginUserClick}
                />
            )}

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
        isUser: state.userReducer.isUser,
        userDetail: state.userDetailReducer.userDetail,
        business: state.businessReducer.businesses,
        alertState: state.notificationReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginUser: async (api: KouponBankApi, user: User) => {
            return loginUser(api, user, dispatch);
        },
        loginOwner: async (api: KouponBankApi, user: User) => {
            return loginOwner(api, user, dispatch);
        },
        getUserDetail: async (api: KouponBankApi, id: string) => {
            return getUserDetail(api, id, dispatch);
        },
        getOwnerDetail: async (api: KouponBankApi, id: string) => {
            return getOwnerDetail(api, id, dispatch);
        },
        getBusinesses: async (api: KouponBankApi) => {
            return getBusinesses(api, dispatch);
        },
        getOwnerBusinesses: async (api: KouponBankApi, userId: string) => {
            return getOwnerBusinesses(api, userId, dispatch);
        },
    };
};

export const LoginPageR = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
