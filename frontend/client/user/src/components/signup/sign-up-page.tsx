import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, User, UserDetail } from "../../api/kb-types";
import { getBusinesses } from "../../store/business/business-reducer";
import { AlertState } from "../../store/notification/notification-reducer";
import { RootReducer } from "../../store/reducer";
import { createNewUser } from "../../store/user/user-reducer";
import { updateUserDetail } from "../../store/user/user-detail-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { SignUpForm } from "./sign-up-form";
import "./sign-up-page.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewUser: (api: KouponBankApi, user: User) => Promise<User>;
    updateUserDetail: (api: KouponBankApi, id: string, userDetail: UserDetail) => Promise<void>;
    getBusinesses: (api: KouponBankApi) => Promise<Business[]>;
    userDetail: UserDetail;
    user: User;
    alertState: AlertState;
}

export const SignUpPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const alert = props.alertState.alert;
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [userDetailCredentials, setUserDetailCredentials] = useState(props.userDetail);
    const [showAlert, setShowAlert] = useState(true);

    const createNewUserClick = (event: React.FormEvent): void => {
        props
            .createNewUser(api, userCredentials)
            .then((user) => {
                props.updateUserDetail(api, user.id, userDetailCredentials);
            })
            .then(() => {
                history.push(UrlPaths.HomePage);
            })
            .catch(() => {
                //currently does nothing
            });
        event.preventDefault();
    };

    const userCredentialsInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUserCredentials({
            ...userCredentials,
            [target.name]: target.value,
        });
    };

    const userDetailCredentialsInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setUserDetailCredentials({
            ...userDetailCredentials,
            [target.name]: target.value,
        });
    };

    return (
        <div>
            <SignUpForm
                userDetailCredentialsInput={userDetailCredentialsInput}
                createNewUserClick={createNewUserClick}
                userCredentialsInput={userCredentialsInput}
            />
            <NavBarR title="Sign Up" />
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
        business: state.businessReducer.businesses,
        alertState: state.notificationReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createNewUser: async (api: KouponBankApi, user: User) => {
            return createNewUser(api, user, dispatch);
        },
        getBusinesses: async (api: KouponBankApi) => {
            return getBusinesses(api, dispatch);
        },
        updateUserDetail: async (api: KouponBankApi, id: string, userDetail: UserDetail) => {
            return updateUserDetail(api, id, userDetail, dispatch);
        },
    };
};

export const SignUpPageR = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
