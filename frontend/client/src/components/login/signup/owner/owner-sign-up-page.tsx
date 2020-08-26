import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components
import { SignUpPageForm } from "./owner-sign-up-form";

// API Components
import { KouponBankApi } from "../../../../api/kb-api";
import { User } from "../../../../api/kb-types";
import { createNewOwner } from "../../../../store/user/user-reducer";
import { ApiContext } from "../../../base-page-router";

// Material UI or CSS Components
import './owner-sign-up-page.css';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewOwner: Function;
    owner: User;
};

export const OwnerSignUpPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [ownerCredentials, setOwnerCredentials] = useState(props.owner);

    const createNewOwnerClick = (event): void => {
        props.createNewOwner(api, ownerCredentials.username, ownerCredentials.password, ownerCredentials.email).then(() => {
            history.push('/')
        });
        event.preventDefault();
    };

    const userSignUpClick = (event): void => {
        history.push("/newuser");
    };

    const ownerCredentialsInput = (event): void => {
        setOwnerCredentials({
            ...ownerCredentials,
            [event.target.name]: event.target.value
        });
    }; 

    return (
        <div className="background">
            <SignUpPageForm 
                ownerCredentials={ownerCredentials}
                createNewOwnerClick={createNewOwnerClick}
                userSignUpClick={userSignUpClick}
                ownerCredentialsInput={ownerCredentialsInput}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        owner: state.userReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewOwner: (
            api: KouponBankApi,
            username: string,
            password: string | number,
            email: string | number,
        ) => {
            return createNewOwner(api, username, password, email, dispatch)
        }
    };
};

export const OwnerSignUpPageR = connect(mapStateToProps, mapDispatchToProps)(OwnerSignUpPage);


