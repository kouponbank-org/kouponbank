import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { User } from "../../api/kb-types";
import './login.scss';

/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    isUser: boolean;
    userCredentials: User;
    userCredentialsInput: (event) => void;
    signUpClick?: (event) => void;
    loginUserClick: (event) => void;
}

export const LoginForm = (props: Prop) => { 

    const loginUserClick = (event): void => { 
        props.loginUserClick(event);
        event.preventDefault();
    }

    const signUpClick = (event): void => {
        props.signUpClick(event);
    };

    const userCredentialsInput = (event): void => { 
        props.userCredentialsInput(event);
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
                            onChange={userCredentialsInput}
                            value={props.userCredentials.username}
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
                            onChange={userCredentialsInput}
                            value={props.userCredentials.email}
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
                    className="loginbutton"
                >
                    로그인
                </Button>
            </form>
            {
                props.isUser ? ( 
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="sign-up-button"
                    onClick={signUpClick}
                >
                    회원가입
                </Button>
                ) : (
                    ""
                )
            }
        </div>
    )
}
