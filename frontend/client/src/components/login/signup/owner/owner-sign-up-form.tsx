// React Components
import React, { useContext, useState } from "react";

import { Owner } from "../../../../api/kb-types";

// Material UI or CSS Components
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import './owner-sign-up-page.css';

export interface Prop {
    ownerCredentials: Owner;
    createNewOwnerClick: (event) => void;
    ownerCredentialsInput: (event) => void;
};

export const SignUpPageForm = (props: Prop) => {

    const createNewOwnerClick = (event): void => {
        props.createNewOwnerClick(event);
    };
    
    const ownerCredentialsInput = (event): void => {
        props.ownerCredentialsInput(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className="form" onSubmit={createNewOwnerClick} noValidate>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="ownerEmail"
                            autoComplete="on"
                            onChange={ownerCredentialsInput}
                            value={props.ownerCredentials.ownerEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="ownerUsername"
                            autoComplete="on"
                            onChange={ownerCredentialsInput}
                            value={props.ownerCredentials.ownerUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="ownerPassword"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="on"
                            onChange={ownerCredentialsInput}
                            value={props.ownerCredentials.ownerPassword}
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