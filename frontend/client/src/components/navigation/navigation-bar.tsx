import {
    AppBar,
    Button,
    InputBase,
    Toolbar
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { Fragment, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { signOut } from "../../store/user/user-reducer";
import { UrlPaths } from "../base-page-router";
import "./navigation-bar.scss";

export interface Prop {
    user: User;
    title?: string;
    buttonName?: string;
    onClick?: (event) => void;
    signOut: () => void;
}

export const NavBar = (props: Prop): ReactElement => {
    const history = useHistory();

    const redirectToHomepage = (event): void => {
        history.push(UrlPaths.Home)
        event.preventDefault();
    }

    const signOut = () => {
        props.signOut();
    };

    const redirectToUserProfile = () => {
        history.push(UrlPaths.UserProfile);
    };
    
    return (
        <div className="nav-bar">
            <AppBar>
                <Toolbar>
                    <Button className="homepage button" onClick={redirectToHomepage}>
                        쿠폰뱅크
                    </Button>
                    <div className="search">
                        {
                            props.title === ("쿠폰뱅크") ? (  
                                <Search 
                                /> &&
                                <InputBase
                                    className="search"
                                    classes={{
                                        root: "search-bar-root",
                                        input: "search-bar-input",
                                    }}
                                    placeholder="Search…"
                                    aria-label="search"
                                />
                            ) : (
                                ""
                            )
                        }
                    </div>
                    {props.user.username !== "" ? (
                        <Fragment>
                            <Button className="profile-details" onClick={redirectToUserProfile}>
                                나만의 공간
                            </Button>
                            <Button className="logout" onClick={signOut}>
                                로그아웃
                            </Button>
                        </Fragment>
                    ) : (
                        <Button onClick={props.onClick}>
                            {props.buttonName}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signOut: () => {
            return signOut(dispatch);
        },
    };
};

export const NavBarR = connect(mapStateToProps, mapDispatchToProps)(NavBar);
