import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Owner } from "../../api/kb-types";
import { getBusinesses } from "../../store/business/business-reducer";
import { AlertState } from "../../store/notification/notification-reducer";
import { createNewOwner } from "../../store/owner/owner-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { SignUpForm } from "./sign-up-form";
import "./sign-up-page.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewOwner: (api: KouponBankApi, owner: Owner) => Promise<void>;
    getBusinesses: (api: KouponBankApi) => Promise<Business[]>;
    owner: Owner;
    alertState: AlertState;
}

export const SignUpPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const alert = props.alertState.alert;
    const [userCredentials, setUserCredentials] = useState(props.owner);
    const [showAlert, setShowAlert] = useState(true);

    const createNewUserClick = (event: React.FormEvent): void => {
        props
            .createNewOwner(api, userCredentials)
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

    return (
        <div className="background">
            <NavBarR title={"Signup Page"} />
            <SignUpForm
                userCredentials={userCredentials}
                createNewUserClick={createNewUserClick}
                userCredentialsInput={userCredentialsInput}
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
        owner: state.ownerReducer.owner,
        business: state.businessReducer.businesses,
        alertState: state.notificationReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createNewOwner: async (api: KouponBankApi, owner: Owner) => {
            return createNewOwner(api, owner, dispatch);
        },
        getBusinesses: async (api: KouponBankApi) => {
            return getBusinesses(api, dispatch);
        },
    };
};

export const SignUpPageR = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
