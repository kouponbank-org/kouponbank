import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer } from "../../store/reducer";
import { createNewOwner, createNewUser } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { SignUpForm } from "./sign-up-form";
import "./sign-up-page.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewUser: (api: KouponBankApi, user: User) => Promise<void>;
    createNewOwner: (api: KouponBankApi, user: User) => Promise<void>;
    user: User;
    alertState: AlertState;
}

export const SignUpPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const alert = props.alertState.alert;
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [showAlert, setShowAlert] = useState(true);
    const [isUser, setIsUser] = useState(true);

    const createNewUserClick = (event: React.FormEvent): void => {
        if (isUser) {
            props
                .createNewUser(api, userCredentials)
                .then(() => {
                    history.push(UrlPaths.Home);
                })
                .catch(() => {
                    //currently does nothing
                });
        } else {
            props
                .createNewOwner(api, userCredentials)
                .then(() => {
                    history.push(UrlPaths.Home);
                })
                .catch(() => {
                    //currently does nothing
                });
        }
        event.preventDefault();
    };

    const userCredentialsInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUserCredentials({
            ...userCredentials,
            [target.name]: target.value,
        });
    };

    const userOrOwnerSignup = (): void => {
        if (isUser) {
            setIsUser(false);
        } else {
            setIsUser(true);
        }
    };

    return (
        <div className="background">
            <NavBarR title={isUser ? "User Signup Page" : "Owner Signup Page"} />
            <SignUpForm
                signUpButtonName={isUser ? "Owner Signup" : "User Signup"}
                userCredentials={userCredentials}
                createNewUserClick={createNewUserClick}
                userCredentialsInput={userCredentialsInput}
                userOrOwnerSignup={userOrOwnerSignup}
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
        createNewUser: async (api: KouponBankApi, user: User) => {
            return createNewUser(api, user, dispatch);
        },
        createNewOwner: async (api: KouponBankApi, user: User) => {
            return createNewOwner(api, user, dispatch);
        },
    };
};

export const SignUpPageR = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
