import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Owner } from "../../api/kb-types";
import "./sign-up-page.scss";

export interface Prop {
    userCredentials: Owner;
    createNewUserClick: (event) => void;
    userCredentialsInput: (event) => void;
}

export const SignUpForm = (props: Prop): JSX.Element => {
    const createNewUserClick = (event: React.FormEvent): void => {
        props.createNewUserClick(event);
    };

    const userCredentialsInput = (event: React.FormEvent): void => {
        props.userCredentialsInput(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                Sign Up
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
        </div>
    );
};
