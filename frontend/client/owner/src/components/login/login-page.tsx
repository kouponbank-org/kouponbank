import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Owner, OwnerDetail } from "../../api/kb-types";
import { getBusinesses, getOwnerBusinesses } from "../../store/business/business-reducer";
import { AlertState } from "../../store/notification/notification-reducer";
import { getOwnerDetail } from "../../store/owner/owner-detail-reducer";
import { loginOwner } from "../../store/owner/owner-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { Notifications } from "../notifications/notifications";
import { LoginForm } from "./login-form";
import "./login.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginOwner: (api: KouponBankApi, owner: Owner) => Promise<Owner>;
    getOwnerDetail: (api: KouponBankApi, id: string) => void;
    getBusinesses: (api: KouponBankApi) => Promise<Business[]>;
    getOwnerBusinesses: (api: KouponBankApi, userid: string) => Promise<void>;
    owner: Owner;
    ownerDetail: OwnerDetail;
    alertState: AlertState;
}

export const LoginPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const alert = props.alertState.alert;
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.owner);
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
            .loginOwner(api, userCredentials)
            .then((owner) => {
                props.getOwnerDetail(api, owner.id);
                props
                    .getOwnerBusinesses(api, owner.id)
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
            <TopNavBarR title={"Business Owner Login Page"} />
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
        owner: state.ownerReducer.owner,
        ownerDetail: state.ownerDetailReducer.ownerDetail,
        business: state.businessReducer.businesses,
        alertState: state.notificationReducer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginOwner: async (api: KouponBankApi, owner: Owner) => {
            return loginOwner(api, owner, dispatch);
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
