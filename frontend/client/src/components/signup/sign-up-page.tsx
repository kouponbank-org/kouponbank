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
import './sign-up-page.scss';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewUser: (
        api: KouponBankApi,
        user: User
    ) => Promise<void>;
    createNewOwner: (
        api: KouponBankApi,
        user: User
    ) => Promise<void>;
    user: User;
    alertState: AlertState;
};

export const SignUpPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const alert = props.alertState.alert
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [showAlert, setShowAlert] = useState(true);
    const [isUser, setIsUser] = useState(true)

    const createNewUserClick = (event): void => {
        isUser === true ? (
            props.createNewUser(
                api,
                userCredentials
            )
            .then(() => {
                history.push(UrlPaths.Home);
            })
        ) : (
            props.createNewOwner(
                api,
                userCredentials
            )
            .then(() => {
                history.push(UrlPaths.Home)
            })
        )
        event.preventDefault();
    };

    const userCredentialsInput = (event): void => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value
        });
    };

    const userOrOwnerSignup = (): void => {
        isUser === true ? setIsUser(false) : setIsUser(true)
    }

    return (
        <div className="background">
            <NavBarR
                title={isUser === true ? "소비자 회원가입 페이지" : "사업자 회원가입 페이지"}
            />
            <SignUpForm 
                signUpButtonName={isUser === true ? "사업자 회원가입" : "소비자 회원가입"}
                userCredentials={userCredentials}
                createNewUserClick={createNewUserClick}
                userCredentialsInput={userCredentialsInput}
                userOrOwnerSignup={userOrOwnerSignup}
            />
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
    return {
        user: state.userReducer.user,
        alertState: state.notificationReducer
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // 저희가 이 파일에서 사용할 Function을 만드는거에요
        createNewUser: (
            api: KouponBankApi,
            user: User
        ) => {
            // API Call이에요 -> UserReducer에 있는 export const createNewUser.
            return createNewUser(api, user, dispatch)
        },
        createNewOwner: (
            api: KouponBankApi,
            user: User
        ) => {
            return createNewOwner(api, user, dispatch);
        }
    };
};

export const SignUpPageR = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

