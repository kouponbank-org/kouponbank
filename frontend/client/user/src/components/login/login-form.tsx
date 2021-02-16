import "./login.scss";

import React from "react";

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

    const directToForgotPasswordPageClick = (event: React.MouseEvent<HTMLElement>): void => {
        //"direct to forgot my password"
    };

    const userLoginInput = (event: React.FormEvent): void => {
        props.userLoginInput(event);
    };

    return (
        <div id="login-page-main">
            <main id="login-page-main-container">
                <div id="login-page-main-column1">
                    <div id="login-page-main-column1-text">
                        <div id="login-page-main-column1-text-row1">로그인</div>
                        <div id="login-page-main-column1-text-row2">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua.
                        </div>
                    </div>
                </div>
                <div id="login-page-main-column2">
                    <div id="login-page-main-column2-row1">
                        <input
                            id="login-page-main-column2-row1-textfield1"
                            required
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            onChange={userLoginInput}
                        />
                        <input
                            id="login-page-main-column2-row1-textfield2"
                            required
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={userLoginInput}
                        />
                    </div>
                    <div id="login-page-main-column2-row2">
                        <button id="login-page-main-column2-row2-button" onClick={loginUserClick}>
                            로그인
                        </button>
                    </div>
                    <div id="login-page-main-column2-row3">
                        <button
                            id="login-page-main-column2-row3-button1"
                            onClick={directToSignUpPageClick}
                        >
                            회원가입
                        </button>
                        <button
                            id="login-page-main-column2-row3-button2"
                            onClick={directToForgotPasswordPageClick}
                        >
                            비밀번호 찾기
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
