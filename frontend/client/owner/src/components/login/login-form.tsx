import "./login.scss";

import React from "react";

import { Button, Grid, TextField } from "@material-ui/core";

import { Owner } from "../../api/kb-types";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    owner: Owner;
    ownerLoginInput: (event) => void;
    directToSignUpPageClick?: (event) => void;
    loginOwnerClick: (event) => void;
}

export const LoginForm = (props: Prop): JSX.Element => {
    const loginOwnerClick = (event: React.FormEvent): void => {
        props.loginOwnerClick(event);
        event.preventDefault();
    };

    const directToSignUpPageClick = (event: React.MouseEvent<HTMLElement>): void => {
        props.directToSignUpPageClick(event);
    };

    const ownerLoginInput = (event: React.FormEvent): void => {
        props.ownerLoginInput(event);
    };

    return (
        <div className="layout">
            <form className="form" onSubmit={loginOwnerClick} autoComplete="off">
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
                            onChange={ownerLoginInput}
                            value={props.owner.username}
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
                            onChange={ownerLoginInput}
                            value={props.owner.email}
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
                            onChange={ownerLoginInput}
                            value={props.owner.password}
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
