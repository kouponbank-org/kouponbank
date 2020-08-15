// React Components
import React from "react";

// Koupon Bank Frontend Components

// API Components

// Material UI Components
import { Button } from '@material-ui/core';

/**
 * Represents the required properties of the HomePageLoginButton.
 */
export interface Prop {
    clickLoginButton: (event) => void;
}

export const HomePageLoginButton = (props: Prop) => {

    const handleSubmit = (event): void => {
        props.clickLoginButton(event);
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="button"
            >
                Log In
            </Button>
        </form>
    )
}