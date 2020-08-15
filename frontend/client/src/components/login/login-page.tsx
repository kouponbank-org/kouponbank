import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { KouponBankApi } from "../../api/kb-api";
import { ApiContext } from "../base-page-router";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

}

export const LoginPage = (props: Prop) => {

    return (
        <div>
            Login Page
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {

    }
}

export const LoginPageR = connect(mapStateToProps)(LoginPage);