import "./login.scss";

import React from "react";

import { Button, Grid, TextField } from "@material-ui/core";

import { User } from "../../api/kb-types";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    user: User;
    userLoginInput: (event) => void;
    directToSignUpPageClick?: (event) => void;
    loginUserClick: (event) => void;
}

export const LoginForm = (props: Prop): JSX.Element => {
    const loginUserClick = (event: React.FormEvent): void => {
        props.loginUserClick(event);
        event.preventDefault();
    };

    const directToSignUpPageClick = (event: React.MouseEvent<HTMLElement>): void => {
        props.directToSignUpPageClick(event);
    };

    const userLoginInput = (event: React.FormEvent): void => {
        props.userLoginInput(event);
    };

    return (
        <div className="layout">
            <form className="form" onSubmit={loginUserClick} autoComplete="off">
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="username"
                            id="username"
                            label="Username"
                            autoComplete="off"
                            type="text"
                            onChange={userLoginInput}
                            value={props.user.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="email"
                            id="email"
                            label="Email"
                            autoComplete="off"
                            type="text"
                            onChange={userLoginInput}
                            value={props.user.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="password"
                            id="password"
                            label="Password"
                            autoComplete="off"
                            type="text"
                            onChange={userLoginInput}
                            value={props.user.password}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="loginbutton"
                >
                    Login
                </Button>
            </form>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="sign-up-button"
                onClick={directToSignUpPageClick}
            >
                Sign up
            </Button>
        </div>
    );
};
