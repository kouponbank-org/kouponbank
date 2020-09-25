import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../../../api/kb-api";
import { User } from "../../../../api/kb-types";
import { AlertState } from "../../../../store/notification/notification-reducer";
import { RootReducer } from "../../../../store/reducer";
import { createNewOwner } from "../../../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../../../base-page-router";
import { Notifications } from "../../../notifications/notifications";
import { OwnerSignUpPageForm } from "./owner-sign-up-form";
import './owner-sign-up-page.scss';




/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewOwner: (
        api: KouponBankApi,
        username: string,
        password: string | number,
        email: string | number,
    ) => Promise<void>;
    owner: User;
    alertState: AlertState;
};

export const OwnerSignUpPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const alert = props.alertState.alert
    const [ownerCredentials, setOwnerCredentials] = useState(props.owner);
    const [showAlert, setShowAlert] = useState(true);

    const createNewOwnerClick = (event): void => {
        props.createNewOwner(
            api,
            ownerCredentials.username,
            ownerCredentials.password,
            ownerCredentials.email
        )
        .then(() => {
            history.push(UrlPaths.Home)
        });
        event.preventDefault();
    };

    const ownerCredentialsInput = (event): void => {
        setOwnerCredentials({
            ...ownerCredentials,
            [event.target.name]: event.target.value
        });
    }; 

    return (
        <div className="background">
            <OwnerSignUpPageForm 
                ownerCredentials={ownerCredentials}
                createNewOwnerClick={createNewOwnerClick}
                ownerCredentialsInput={ownerCredentialsInput}
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
        owner: state.userReducer.user,
        alertState: state.notificationReducer
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createNewOwner: (
            api: KouponBankApi,
            username: string,
            password: string | number,
            email: string | number,
        ) => {
            return createNewOwner(api, username, password, email, dispatch);
        }
    };
};

export const OwnerSignUpPageR = connect(mapStateToProps, mapDispatchToProps)(OwnerSignUpPage);


