import React from "react";
import { connect } from "react-redux";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

};

export const UserProfilePage = (props: Prop) => {

    return (
        <div>
            User Profile Page
        </div>
    );
};

const mapStateToProps = state => {
    return {

    };
};

export const UserProfilePageR = connect(mapStateToProps)(UserProfilePage);