import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../../api/kb-types";
import './sign-up-page.scss';


export interface Prop {
    signUpButtonName: string;
    userCredentials: User;
    createNewUserClick: (event) => void;
    userCredentialsInput: (event) => void;
    userOrOwnerSignup: (event) => void;
};

export const SignUpForm = (props: Prop) => {

    const createNewUserClick = (event): void => {
        props.createNewUserClick(event);
    };

    const userOrOwnerSignup = (event): void => {
        props.userOrOwnerSignup(event);
    }
    
    const userCredentialsInput = (event): void => {
        props.userCredentialsInput(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                회원가입
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="switch-sign-up-button"
                onClick={userOrOwnerSignup}
            >
                {props.signUpButtonName}
            </Button>
        </div>
    );
};