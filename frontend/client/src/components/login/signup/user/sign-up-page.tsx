import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../../../api/kb-api";
import { User } from "../../../../api/kb-types";
import { createNewUser } from "../../../../store/user/user-reducer";
import { ApiContext } from "../../../base-page-router";
import { SignUpPageForm } from "./sign-up-form";
import './user-sign-up-page.scss';

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
        props.createNewUser(api, userCredentials.username, userCredentials.password, userCredentials.email).then(() => {
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
            password: string | number,
            email: string | number
        ) => {
            return createNewUser(api, username, password, email, dispatch)
        }
    };
};

export const UserSignUpPageR = connect(mapStateToProps, mapDispatchToProps)(UserSignUpPage);