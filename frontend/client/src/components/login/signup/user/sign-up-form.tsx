import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../../../../api/kb-types";
import './user-sign-up-page.scss';


export interface Prop {
    userCredentials: User;
    createNewUserClick: (event) => void;
    ownerSignUpClick: (event) => void;
    userCredentialsInput: (event) => void;
};

export const SignUpPageForm = (props: Prop) => {

    const createNewUserClick = (event): void => {
        props.createNewUserClick(event);
    };

    const ownerSignUpClick = (event): void => {
        props.ownerSignUpClick(event);
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
                            name="email"
                            autoComplete="on"
                            onChange={userCredentialsInput}
                            value={props.userCredentials.email}
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="on"
                            onChange={userCredentialsInput}
                            value={props.userCredentials.password}
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
            <form className="form" onSubmit={ownerSignUpClick} noValidate>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="ownerSignUp"
                >
                    Are you an Owner?
                </Button>
            </form>
        </div>
    );
};