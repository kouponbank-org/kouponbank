// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";

// Koupon Bank Frontend Components

// API Components
import { KouponBankApi } from "../../api/kb-api";
import { ApiContext } from "../base-page-router";

// Material UI Components


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

}

export const UserProfilePage = (props: Prop) => {

    return (
        <div>
            User Profile Page
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {

    }
}

export const UserProfilePageR = connect(mapStateToProps)(UserProfilePage);