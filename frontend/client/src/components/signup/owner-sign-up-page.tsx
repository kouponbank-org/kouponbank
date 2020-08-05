import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { KouponBankApi } from "../../api/kb-api";
import { ApiContext } from "../base-page-router";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

}

export const OwnerSignUpPage = (props: Prop) => {

    return (
        <div>
            Owner Signup Page
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {

    }
}

export const UserSignUpPageR = connect(mapStateToProps)(OwnerSignUpPage);