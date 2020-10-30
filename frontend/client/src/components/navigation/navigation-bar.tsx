import { AppBar, Button, InputBase, Toolbar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { Fragment, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer, signOut } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import "./navigation-bar.scss";

export interface Prop {
    user?: User;
    userDetail?: UserDetail;
    title?: string;
    isOwner?: boolean;
    buttonName?: string;
    onClick?: (event) => void;
    signOut?: () => void;
}

export const NavBar = (props: Prop): ReactElement => {
    const history = useHistory();

    const redirectToHomepage = (event: React.MouseEvent<HTMLElement>): void => {
        history.push(UrlPaths.Home);
        event.preventDefault();
    };

    const signOut = () => {
        props.signOut();
        history.push(UrlPaths.Home);
    };

    const redirectToUserProfile = () => {
        history.push(UrlPaths.UserProfile);
    };

    const redirectToOwnerProfile = () => {
        history.push(UrlPaths.OwnerProfile);
    };

    return (
        <div className="nav-bar">
            <AppBar>
                <Toolbar>
                    <Button className="homepage button" onClick={redirectToHomepage}>
                        쿠폰뱅크
                    </Button>
                    <div className="search">
                        {props.title === "쿠폰뱅크" 
                            ? <Search /> && (
                                <InputBase
                                    className="search"
                                    classes={{
                                        root: "search-bar-root",
                                        input: "search-bar-input",
                                    }}
                                    placeholder="Search…"
                                    aria-label="search"
                                />
                            )
                        : "" }
                    </div>
                    <div>{props.title}</div>
                    {props.user.username !== "" ? (
                        <Fragment>
                            {props.isOwner ? (
                                <Button 
                                    className="profile-details"
                                    onClick={redirectToOwnerProfile}
                                >
                                    나만의 공간 
                                </Button>
                            ) : (
                                <Button 
                                    className="profile-details"
                                    onClick={redirectToUserProfile}
                                >
                                    나만의 공간
                                </Button>
                            )}
                            <Button className="logout" onClick={signOut}>
                                로그아웃
                            </Button>
                        </Fragment>
                    ) : (
                        <Button onClick={props.onClick}>{props.buttonName}</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        isOwner: state.userReducer.isOwner,
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
