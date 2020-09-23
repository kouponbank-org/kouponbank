import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../../../../api/kb-types";
import './owner-sign-up-page.scss';



export interface Prop {
    ownerCredentials: User;
    createNewOwnerClick: (event) => void;
    ownerCredentialsInput: (event) => void;
};

export const OwnerSignUpPageForm = (props: Prop) => {

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
                            name="email"
                            autoComplete="on"
                            onChange={ownerCredentialsInput}
                            value={props.ownerCredentials.email}
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
                            onChange={ownerCredentialsInput}
                            value={props.ownerCredentials.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="on"
                            onChange={ownerCredentialsInput}
                            value={props.ownerCredentials.password}
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