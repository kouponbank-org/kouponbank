import "./sign-up-page.scss";

import React from "react";

export interface Prop {
    createNewUserClick: (event) => void;
    checkUsernameClick: (event) => void;
    usernameOpen: string;
    passwordOpen: boolean;
    usernamePass: boolean;
    userSignUpInput: (event) => void;
    userDetailSignUpInput: (event) => void;
    passwordConfirmation: (event) => void;
}

export const SignUpForm = (props: Prop): JSX.Element => {
    const createNewUserClick = (event: React.FormEvent): void => {
        props.createNewUserClick(event);
    };

    const checkUsernameClick = (event: React.FormEvent): void => {
        props.checkUsernameClick(event);
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
                        <div id="signup-page-main-column1-text-row1">회원가입</div>
                        <div id="signup-page-main-column1-text-row2">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                            voluptua.
                        </div>
                    </div>
                </div>
                <div id="signup-page-main-column2">
                    <div id="signup-page-main-column2-row1">
                        <div id="signup-page-main-column2-row1-textfield1">
                            <input
                                id="signup-page-main-column2-row1-textfield1-textfield"
                                required
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={userSignUpInput}
                            />
                            <button
                                id="signup-page-main-column2-row1-textfield1-button"
                                onClick={checkUsernameClick}
                            >
                                중복확인
                            </button>
                        </div>
                        {props.usernameOpen == "1" ? (
                            <div>
                                {props.usernamePass ? (
                                    <div id="signup-page-main-column2-row1-username-not-passed">
                                        사용 가능한 유저네임입니다.
                                    </div>
                                ) : (
                                    <div id="signup-page-main-column2-row1-username-not-passed">
                                        이미 존재하는 유저네임입니다.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {props.usernameOpen == "2" ? (
                                    <div id="signup-page-main-column2-row1-username-not-passed">
                                        유저네임을 확인해주세요
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        )}
                        <input
                            id="signup-page-main-column2-row1-textfield5"
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={userSignUpInput}
                        />
                        <input
                            id="signup-page-main-column2-row1-textfield2"
                            required
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={userSignUpInput}
                        />
                        <input
                            id="signup-page-main-column2-row1-textfield3"
                            required
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Password Confirmation"
                            onChange={passwordConfirmation}
                        />
                        {props.passwordOpen ? (
                            <div id="signup-page-main-column2-row1-password-not-same">
                                비밀번호가 일치하지 않습니다.
                            </div>
                        ) : (
                            ""
                        )}
                        <div id="signup-page-main-column2-row1-textfield4">
                            <div id="signup-page-main-column2-row1-textfield4-row1">생일, 성별</div>
                            <div id="signup-page-main-column2-row1-textfield4-row2">
                                <input
                                    id="signup-page-main-column2-row1-textfield4-row2-textfield1"
                                    required
                                    type="date"
                                    name="birthday"
                                    placeholder="Birthday"
                                    onChange={userDetailSignUpInput}
                                />
                                <select
                                    id="signup-page-main-column2-row1-textfield4-row2-textfield2"
                                    required
                                    name="gender"
                                    onChange={userDetailSignUpInput}
                                >
                                    <option>--</option>
                                    <option value="Male"> 남 </option>
                                    <option value="Female"> 여 </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id="signup-page-main-column2-row2">
                        <button
                            id="signup-page-main-column2-row2-button"
                            onClick={createNewUserClick}
                        >
                            회원가입
                        </button>
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
