// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components
import { LoginForm } from "./login-form";

// API Components
import { KouponBankApi } from "../../api/kb-api";
import { ApiContext } from "../base-page-router";

// Material UI Components


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

}

export const LoginPage = (props: Prop) => {
    const [newUserName, setNewUserName] = useState("");
    const history = useHistory();
    const api = useContext<KouponBankApi>(ApiContext);

    const clickCreateNewUser = (event): void => {
        history.push("/newuser")
    }

    return (
        <div>
            <LoginForm 
                clickCreateNewUser={clickCreateNewUser}
            />
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {

    }
}

export const LoginPageR = connect(mapStateToProps)(LoginPage);