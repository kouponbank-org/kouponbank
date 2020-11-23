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
                        Koupon Bank
                    </Button>
                    <div className="search">
                        {props.title === "Koupon Bank" ? (
                            <Button
                                color="inherit"
                                onClick={() => setOpen(true)}
                                className="search-address-modal button"
                            >
                                Search Business
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
                                    !props.isUser ? (
                                        <Button className="profile-details" onClick={redirectToOwnerProfile}>
                                            My Profile
                                        </Button>
                                    ) : (
                                        <Button className="profile-details" onClick={redirectToUserProfile}>
                                            My Profile
                                        </Button>
                                    )
                                }
                                <Button className="logout" onClick={signOut}>
                                    Sign Out
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
                <SearchBusinessR open={open} />
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
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
