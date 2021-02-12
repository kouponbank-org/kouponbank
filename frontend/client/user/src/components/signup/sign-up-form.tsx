import './sign-up-page.scss';

//import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from 'react';

export interface Prop {
    createNewUserClick: (event) => void;
    userSignUpInput: (event) => void;
    userDetailSignUpInput: (event) => void;
    passwordConfirmation: (event) => void;
}

export const SignUpForm = (props: Prop): JSX.Element => {
    const createNewUserClick = (event: React.FormEvent): void => {
        props.createNewUserClick(event);
    };

    const userSignUpInput = (event: React.FormEvent): void => {
        props.userSignUpInput(event);
    };

    const userDetailSignUpInput = (event: React.FormEvent): void => {
        props.userDetailSignUpInput(event);
    };

    const passwordConfirmation = (event: React.FormEvent): void => {
        props.passwordConfirmation(event);
    };

    //TODO:
    //Password Confirmation

    return (
        <div id="signup-page-main">
            <main id="signup-page-main-container">
                <div id="signup-page-main-column1">
                    <div id="signup-page-main-column1-text">
                        <div id="signup-page-main-column1-text-row1">
                            회원가입
                        </div>
                        <div id="signup-page-main-column1-text-row2">
                            Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam 
                            nonumy eirmod tempor invidunt ut 
                            labore et dolore magna aliquyam erat, 
                            sed diam voluptua. 
                        </div>
                    </div>
                </div>
                <div id="signup-page-main-column2">
                    <div id="signup-page-main-column2-row1">
                        <div id="signup-page-main-column2-row1-textfield1">
                            <input id="signup-page-main-column2-row1-textfield1-textfield" required type="email" name="email" placeholder="E-mail" onChange={userSignUpInput}/>
                            <button id="signup-page-main-column2-row1-textfield1-button"> 인증 </button>
                        </div>
                        <input id="signup-page-main-column2-row1-textfield2" required type="password" name="password" placeholder="Password" onChange={userSignUpInput}/>
                        <input id="signup-page-main-column2-row1-textfield3" required type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={passwordConfirmation}/>
                        <div id="signup-page-main-column2-row1-textfield4">
                            <div id="signup-page-main-column2-row1-textfield4-row1">생일, 성별</div>
                            <div id="signup-page-main-column2-row1-textfield4-row2">
                                <input id="signup-page-main-column2-row1-textfield4-row2-textfield1" required type="date" name="birthday" placeholder="Birthday" onChange={userDetailSignUpInput}/>
                                <select id="signup-page-main-column2-row1-textfield4-row2-textfield2" required name="gender" onChange={userDetailSignUpInput}>
                                    <option>--</option>
                                    <option value="Male"> 남 </option>
                                    <option value="Female"> 여 </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id="signup-page-main-column2-row2">
                        <button id="signup-page-main-column2-row2-button" onClick={createNewUserClick}> 회원가입 </button>
                    </div>
                    <div id="signup-page-main-column2-row3">
                        <button id="signup-page-main-column2-row3-button1"> 구글 </button>
                        <button id="signup-page-main-column2-row3-button2"> 카카오 </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
