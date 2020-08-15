// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components

// API Components
import { ApiContext } from "../base-page-router";
import { KouponBankApi } from "../../api/kb-api";

// Material UI Components
import { Button } from "@material-ui/core";

/**
 * Represents the required properties of the LoginForm.
 */
export interface Prop {
    clickCreateNewUser: (event) => void;
}

export const LoginForm = (props: Prop) => {

    const createNewUserButton = (event): void => {
        props.clickCreateNewUser(event);
    }

    return (
        <form onSubmit={createNewUserButton} autoComplete="off">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="button"
            >
                Create New User
            </Button>
        </form>
    );
}
