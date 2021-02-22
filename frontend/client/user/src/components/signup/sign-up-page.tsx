import "./sign-up-page.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer, signOut } from "../../store/reducer";
import { createNewUser, usernameCheck } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { Footer } from "../common-components/footer/footer";
import { NavBar } from "../common-components/navigation/navigation-bar";
import { Notifications } from "../common-components/notifications/notifications";
import { SignUpForm } from "./sign-up-form";

// TODO: FIX SIGNUP PAGE AND SIGNUP FORM
/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewUser: (api: KouponBankApi, user: User, userDetail: UserDetail) => Promise<void>;
    usernameCheck: (api: KouponBankApi, user: User) => Promise<boolean>;
    user: User;
    userDetail: UserDetail;
    alertState: AlertState;
    signOut?: () => void;
}

export const SignUpPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const alert = props.alertState.alert;
    const [usernamePass, setUsernamePass] = useState(Boolean);
    const [usernameOpen, setUsernameOpen] = useState("0");
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [user, setUser] = useState(props.user);
    const [userDetail, setUserDetail] = useState(props.userDetail);
    const [showAlert, setShowAlert] = useState(true);
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");

    const checkUsernameClick = (event: React.FormEvent): void => {
        props.usernameCheck(api, user).then((boolean) => {
            if (boolean) setUsernamePass(true);
            else setUsernamePass(false);
        });
        setUsernameOpen("1");
        event.preventDefault();
    };

    const createNewUserClick = (event: React.FormEvent): void => {
        if (user.password != passwordConfirmationInput) setPasswordOpen(true);
        else if (usernamePass)
            props
                .createNewUser(api, user, userDetail)
                .then(() => {
                    history.push(UrlPaths.HomePage);
                })
                .catch(() => {
                    //currently does nothing
                });
        else setUsernameOpen("2");
        event.preventDefault();
    };

    //TODO: need to deal with username and password confirmation
    const userSignUpInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUser({
            ...user,
            [target.name]: target.value,
        });
    };

    const passwordConfirmation = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPasswordConfirmationInput(event.target.value);
    };

    const userDetailSignUpInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUserDetail({
            ...userDetail,
            [target.name]: target.value,
        });
    };

    //added signout button for the convenience.
    const signOut = () => {
        props.signOut();
        history.push(UrlPaths.HomePage);
    };

    return (
        <div id="signup-page">
            <NavBar />
            <SignUpForm
                createNewUserClick={createNewUserClick}
                checkUsernameClick={checkUsernameClick}
                usernameOpen={usernameOpen}
                passwordOpen={passwordOpen}
                usernamePass={usernamePass}
                userDetailSignUpInput={userDetailSignUpInput}
                userSignUpInput={userSignUpInput}
                passwordConfirmation={passwordConfirmation}
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
            <button onClick={signOut}> Sign Out</button>
            <Footer />
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
        createNewUser: async (api: KouponBankApi, user: User, userDetail: UserDetail) => {
            return createNewUser(api, user, userDetail, dispatch);
        },
        usernameCheck: async (api: KouponBankApi, user: User) => {
            return usernameCheck(api, user, dispatch);
        },
        signOut: () => {
            return signOut(dispatch);
        },
    };
};

export const SignUpPageR = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
