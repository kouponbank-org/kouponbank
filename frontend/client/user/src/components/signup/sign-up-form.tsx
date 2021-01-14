import "./sign-up-page.scss";

//import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => <button {...props}>{children}</button>;

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => (
    <input {...props} />
);

export interface Prop {
    createNewUserClick: (event) => void;
    userCredentialsInput: (event) => void;
    userDetailCredentialsInput: (event) => void;
}

export const SignUpForm = (props: Prop): JSX.Element => {
    const createNewUserClick = (event: React.FormEvent): void => {
        props.createNewUserClick(event);
    };

    const userCredentialsInput = (event: React.FormEvent): void => {
        props.userCredentialsInput(event);
    };

    const userDetailCredentialsInput = (event: React.FormEvent): void => {
        props.userDetailCredentialsInput(event);
    };

    //TODO:
    //Password Confirmation
    //Margin error fix
    //Media Query

    return (
        <div className="background-sign-up">
            <section className="textfield-container">
                <label className="textfield-label">Email</label>
                <Input
                    type="email"
                    className="textfield"
                    name="email"
                    onChange={userCredentialsInput}
                    placeholder="Email"
                ></Input>
                <label className="textfield-label">Password</label>
                <Input
                    type="password"
                    className="textfield"
                    name="password"
                    onChange={userCredentialsInput}
                    placeholder="Password"
                ></Input>
                <label className="textfield-label">Confirm Password</label>
                <Input
                    type="password"
                    className="textfield"
                    name="password-confirmation"
                    placeholder="Password Confrimation"
                ></Input>
                <label className="textfield-label">Username</label>
                <Input
                    type="text"
                    className="textfield"
                    name="username"
                    onChange={userCredentialsInput}
                    placeholder="Username"
                ></Input>
                <section className="birthday-gender-container">
                    <label className="textfield-label">Birthday</label>
                    <label className="textfield-label">Gender</label>
                    <Input
                        type="date"
                        className="birthday-textfield"
                        name="birthday"
                        onChange={userDetailCredentialsInput}
                    ></Input>
                    <Input
                        type="radio"
                        id="male"
                        className="gender-textfield"
                        name="gender"
                        value="male"
                        onChange={userDetailCredentialsInput}
                    ></Input>
                    <label htmlFor="male">Male</label>
                    <Input
                        type="radio"
                        id="female"
                        className="gender-textfield"
                        name="gender"
                        value="female"
                        onChange={userDetailCredentialsInput}
                    ></Input>
                    <label htmlFor="female">Female</label>
                </section>
            </section>
            <section className="button-container">
                <Button className="button" onClick={createNewUserClick}>
                    Sign Up
                </Button>
            </section>
        </div>
    );
};
