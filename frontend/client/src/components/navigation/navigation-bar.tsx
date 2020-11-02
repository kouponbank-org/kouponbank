import { AppBar, Button, Dialog, Toolbar } from "@material-ui/core";
import React, { Fragment, ReactElement, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer, signOut } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { SearchBusinessR } from "./business/business-search";
import "./navigation-bar.scss";

export interface Prop {
    user?: User;
    userDetail?: UserDetail;
    title?: string;
    isUser: boolean;
    buttonName?: string;
    onClick?: (event) => void;
    signOut?: () => void;
}

export const NavBar = (props: Prop): ReactElement => {
    const [open, setOpen] = useState(false);
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
                        {props.title === "쿠폰뱅크" ? (
                            <Button
                                color="inherit"
                                onClick={() => setOpen(true)}
                                className="search-address-modal button"
                            >
                                Business 찾기
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {props.title}
                    </div>
                    {
                        props.user.username !== "" ? (
                            <Fragment>
                                {
                                    props.isUser === false ? (
                                        <Button className="profile-details" onClick={redirectToOwnerProfile}>
                                            나만의 공간 
                                        </Button>
                                    ) : (
                                        <Button className="profile-details" onClick={redirectToUserProfile}>
                                            나만의 공간
                                        </Button>
                                    )
                                }
                                <Button className="logout" onClick={signOut}>
                                    로그아웃
                                </Button>
                        </Fragment>
                    ) : (
                        <Button onClick={props.onClick}>{props.buttonName}</Button>
                    )}
                </Toolbar>
            </AppBar>
            <Dialog
                fullWidth={true}
                maxWidth="xl"
                scroll="body"
                open={open}
                onClose={() => setOpen(false)}
                className="search-address-modal modal"
            >
                <SearchBusinessR />
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        user: state.userReducer.user,
        isUser: state.userReducer.isUser,
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
