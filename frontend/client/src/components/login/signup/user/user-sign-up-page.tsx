import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../../../api/kb-api";
import { User } from "../../../../api/kb-types";
import { NotificationState } from "../../../../store/notification/notification-reducer";
import { RootReducer } from "../../../../store/reducer";
import { createNewUser } from "../../../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../../../base-page-router";
import { Notifications } from "../../../notifications/notifications";
import { SignUpPageForm } from "./user-sign-up-form";
import './user-sign-up-page.scss';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewUser: (
        api: KouponBankApi,
        username: string,
        password: string | number,
        email: string | number,
    ) => Promise<void>;
    user: User;
    notificationState: NotificationState;
};

export const UserSignUpPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [showNotifications, setShowNotifications] = useState(true);

    const createNewUserClick = (event): void => {
        props.createNewUser(
            api,
            userCredentials.username,
            userCredentials.password,
            userCredentials.email
        )
        .then(() => {
            history.push(UrlPaths.Home);
        });
        event.preventDefault();
    };

    const userCredentialsInput = (event): void => {
        setUserCredentials({
            ...userCredentials,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="background">
            <Notifications
                onClose={() => {setShowNotifications(false)}}
                showNotifications={showNotifications}
                displayNotification={props.notificationState.displayNotification}
                notificationType={props.notificationState.notificationType}
                notificationHeader={props.notificationState.notificationHeader}
                notificationBody={props.notificationState.notificationBody}
            />
            <SignUpPageForm 
                userCredentials={userCredentials}
                createNewUserClick={createNewUserClick}
                userCredentialsInput={userCredentialsInput}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        notificationState: state.notificationReducer
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        // 저희가 이 파일에서 사용할 Function을 만드는거에요
        createNewUser: (
            api: KouponBankApi,
            username: string,
            password: string | number,
            email: string | number
        ) => {
            // API Call이에요 -> UserReducer에 있는 export const createNewUser.
            return createNewUser(api, username, password, email, dispatch)
        }
    };
};

export const UserSignUpPageR = connect(mapStateToProps, mapDispatchToProps)(UserSignUpPage);