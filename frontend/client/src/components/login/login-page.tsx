import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { User } from "../../api/kb-types";
import { ApiContext } from "../base-page-router";
import { NavBar } from "../navigation/navigation-bar";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
};

export const LoginPage = (props: Prop) => {
    const [newUserName, setNewUserName] = useState("");
    const history = useHistory();
    const api = useContext<KouponBankApi>(ApiContext);

    const clickCreateNewUser = (event): void => {
        history.push("/newuser");
    };

    return (
        <div>
            <NavBar 
                username={null}
                title={"Login Page"}
                buttonName={"Create New User"}
                onClick={clickCreateNewUser}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    };
};

export const LoginPageR = connect(mapStateToProps)(LoginPage);