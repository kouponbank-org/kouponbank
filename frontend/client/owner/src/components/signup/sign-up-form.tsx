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
    createNewOwnerClick: (event) => void;
    ownerSignUpInput: (event) => void;
    ownerDetailSignUpInput: (event) => void;
}

export const SignUpForm = (props: Prop): JSX.Element => {
    const createNewOwnerClick = (event: React.FormEvent): void => {
        props.createNewOwnerClick(event);
    };

    const ownerSignUpInput = (event: React.FormEvent): void => {
        props.ownerSignUpInput(event);
    };

    const ownerDetailSignUpInput = (event: React.FormEvent): void => {
        props.ownerDetailSignUpInput(event);
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
                        onChange={ownerSignUpInput}
                        placeholder="Email"
                    />
                <label className="textfield-label">Password</label>
                    <Input
                        type="password"
                        className="textfield"
                        name="password"
                        onChange={ownerSignUpInput}
                        placeholder="Password"
                    />
                <label className="textfield-label">Confirm Password</label>
                    <Input
                        type="password"
                        className="textfield"
                        name="password-confirmation"
                        placeholder="Password Confirmation"
                    />
                <label className="textfield-label">Username</label>
                    <Input
                        type="text"
                        className="textfield"
                        name="username"
                        onChange={ownerSignUpInput}
                        placeholder="Username"
                    />
                <section className="birthday-gender-container">
                    <label className="textfield-label">Birthday</label>
                        <Input
                            type="date"
                            className="birthday-textfield"
                            name="birthday"
                            onChange={ownerDetailSignUpInput}
                        />
                    <label className="textfield-label">Gender</label>
                        <Input
                            type="radio"
                            id="male"
                            className="gender-textfield"
                            name="gender"
                            value="male"
                            onChange={ownerDetailSignUpInput}
                        />
                    <label htmlFor="male">Male</label>
                        <Input
                            type="radio"
                            id="female"
                            className="gender-textfield"
                            name="gender"
                            value="female"
                            onChange={ownerDetailSignUpInput}
                        />
                    <label htmlFor="female">Female</label>
                </section>
            </section>
            <section className="button-container">
                <Button className="button" onClick={createNewOwnerClick}>
                    Sign Up
                </Button>
            </section>
        </div>
    );
};
