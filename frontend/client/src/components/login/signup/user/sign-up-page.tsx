// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components
import { store } from "../../../../store";
import { SignUpPageForm } from "./sign-up-form";

// API Components
import { KouponBankApi } from "../../../../api/kb-api";
import { User } from "../../../../api/kb-types";
import { createNewUser } from "../../../../store/user/user-reducer";
import { ApiContext } from "../../../base-page-router";

// Material UI or CSS Components
import './user-sign-up-page.css';


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewUser: Function;
    user: User;
};

export const UserSignUpPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.user);

    const createNewUserClick = (event): void => {
        props.createNewUser(api, userCredentials.username, userCredentials.userPassword, userCredentials.userEmail).then(() => {
            history.push('/')
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
            <SignUpPageForm 
                userCredentials={userCredentials}
                createNewUserClick={createNewUserClick}
                userCredentialsInput={userCredentialsInput}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (
            api: KouponBankApi,
            username: string,
            userPassword: string | number,
            userEmail: string
        ) => {
            return createNewUser(api, username, userPassword, userEmail, dispatch)
        }
    };
};

export const UserSignUpPageR = connect(mapStateToProps, mapDispatchToProps)(UserSignUpPage);