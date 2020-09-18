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
            history.push("/")
        });
        event.preventDefault();
    };

    const ownerSignUpClick = (event): void => {
        history.push("/newowneruser");
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
                ownerSignUpClick={ownerSignUpClick}
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