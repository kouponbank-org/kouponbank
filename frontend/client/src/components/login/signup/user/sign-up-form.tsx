// React Components
import React, { useContext, useState } from "react";

import { User } from "../../../../api/kb-types";

// Material UI or CSS Components
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import './user-sign-up-page.css';

export interface Prop {
    userCredentials: User;
    createNewUserClick: (event) => void;
    userCredentialsInput: (event) => void;
};

export const SignUpPageForm = (props: Prop) => {

    const createNewUserClick = (event): void => {
        props.createNewUserClick(event);
    };
    
    const userCredentialsInput = (event): void => {
        props.userCredentialsInput(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className="form" onSubmit={createNewUserClick} noValidate>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="userEmail"
                            autoComplete="on"
                            onChange={userCredentialsInput}
                            value={props.userCredentials.userEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="on"
                            onChange={userCredentialsInput}
                            value={props.userCredentials.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="userPassword"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="on"
                            onChange={userCredentialsInput}
                            value={props.userCredentials.userPassword}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="signupbutton"
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
};