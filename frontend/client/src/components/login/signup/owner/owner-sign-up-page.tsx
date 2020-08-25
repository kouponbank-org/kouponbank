// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components
import { store } from "../../../../store";
import { SignUpPageForm } from "./owner-sign-up-form";

// API Components
import { KouponBankApi } from "../../../../api/kb-api";
import { Owner } from "../../../../api/kb-types";
import { createNewOwner } from "../../../../store/owner/owner-reducer";
import { ApiContext } from "../../../base-page-router";

// Material UI or CSS Components
import './owner-sign-up-page.css';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewOwner: Function;
    owner: Owner;
};

export const OwnerSignUpPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [ownerCredentials, setOwnerCredentials] = useState(props.owner);

    const createNewOwnerClick = (event): void => {
        props.createNewOwner(api, ownerCredentials.ownerUsername, ownerCredentials.ownerPassword, ownerCredentials.ownerEmail).then(() => {
            history.push('/')
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
            <SignUpPageForm 
                ownerCredentials={ownerCredentials}
                createNewOwnerClick={createNewOwnerClick}
                ownerCredentialsInput={ownerCredentialsInput}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        owner: state.ownerReducer.owner
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewOwner: (
            api: KouponBankApi,
            ownerUsername: string,
            ownerPassword: string | number,
            ownerEmail: string
        ) => {
            return createNewOwner(api, ownerUsername, ownerPassword, ownerEmail, dispatch)
        }
    };
};

export const OwnerSignUpPageR = connect(mapStateToProps, mapDispatchToProps)(OwnerSignUpPage);


