import React from "react";
import { connect } from "react-redux";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

};

export const OwnerSignUpPage = (props: Prop) => {

    return (
        <div>
            Owner Signup Page
        </div>
    );
};

const mapStateToProps = state => {
    return {

    };
};

export const OwnerSignUpPageR = connect(mapStateToProps)(OwnerSignUpPage);