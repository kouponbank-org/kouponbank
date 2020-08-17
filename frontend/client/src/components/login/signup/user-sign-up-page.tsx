// React Components
import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Koupon Bank Frontend Components
import { store } from "../../../store";

// API Components
import { KouponBankApi } from "../../../api/kb-api";
import { ApiContext } from "../../base-page-router";
import { createNewUser } from "../../../store/main-reducer";

// Material UI or CSS Components
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import './user-sign-up-page.css';
import { User } from "../../../api/kb-types";


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User
}

export const UserSignUpPage = (props: Prop) => {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();

    const createNewUserClick = (event): void => {
        store.dispatch(createNewUser(api, newUserName, newPassword)).then(() => {
            console.log('after store.dispatch')
            history.push('/')
        }).catch(() => { 

        });
        event.preventDefault();
    }

    /**
     * 이 variabled 줄이는 방법 알아내기 - 성현.
     * Conditional Operator 써야할듯.
     */
    const firstNameInput = (event): void => {
        setNewFirstName(event.target.value);
    }

    const lastNameInput = (event): void => {
        setNewLastName(event.target.value);
    } 
    
    const userNameInput = (event): void => {
        setNewUserName(event.target.value);
    }
    
    const emailInput = (event): void => {
        setNewEmail(event.target.value);
    }    
    
    const passwordInput = (event): void => {
        setNewPassword(event.target.value);
    }    
    


    return (
        <div className="background">
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
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="on"
                                onChange={userNameInput}
                                value={newUserName}
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
                                onChange={passwordInput}
                                value={newPassword}
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
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.mainReducer.user
    }
}

export const UserSignUpPageR = connect(mapStateToProps)(UserSignUpPage);