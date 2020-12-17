import React, { Fragment, ReactElement, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer, signOut } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { NavTab } from "react-router-tabs";
//import { SearchBusinessR } from "./business/business-search";
import "./navigation-bar.scss";

export interface Prop {
    user?: User;
    userDetail?: UserDetail;
    title?: string;
    buttonName?: string;
    onClick?: (event) => void;
    signOut?: () => void;
}

export const NavBar = (props: Prop): ReactElement => {
    //const [open, setOpen] = useState(false);
    const history = useHistory();

    // const redirectToHomepage = (event: React.MouseEvent<HTMLElement>): void => {
    //     history.push(UrlPaths.HomePage);
    //     event.preventDefault();
    // };

    const signOut = () => {
        props.signOut();
        history.push(UrlPaths.HomePage);
    };

    // const redirectToProfilePage = () => {
    //     history.push(UrlPaths.ProfilePage);
    // };

    const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
        children,
        ...props
    }) => <button {...props}>{children}</button>;

    //TODO:
    // 1) nav-tab button, show Image,
    // 2) media queries
    // 3) reorganize the top nav and bottom nav margins

    return (
        <div className="nav">
            <div className="nav-bar">
                <Button className="back-button" onClick={history.goBack}>
                    Back
                </Button>
                <div className="title">{props.title}</div>
                <Button className="logout" onClick={signOut}>
                    Sign Out
                </Button>
            </div>

            {props.title === "Sign Up" || props.title === "Log In" ? (
                ""
            ) : (
                <div className="nav-tab">
                    <NavTab className="nav-tab-content" exact to={UrlPaths.HomePage}>
                        <img src="images/Icon/home1.png" alt="Home" className="nav-tab-icon" />
                    </NavTab>
                    <NavTab className="nav-tab-content" exact to={UrlPaths.HomePage}>
                        <img
                            src="images/Icon/discover1.png"
                            alt="Discover"
                            className="nav-tab-icon"
                        />
                    </NavTab>
                    <NavTab className="nav-tab-content" exact to={UrlPaths.LoginPage}>
                        <img src="images/Icon/map1.png" alt="login" className="nav-tab-icon" />
                    </NavTab>
                    <NavTab className="nav-tab-content" exact to={UrlPaths.SignUpPage}>
                        <img src="images/Icon/fav1.png" alt="signup" className="nav-tab-icon" />
                    </NavTab>
                    <NavTab className="nav-tab-content" to={UrlPaths.ProfilePage}>
                        <img
                            src="images/Icon/profile1.png"
                            alt="My Profile"
                            className="nav-tab-icon"
                        />
                    </NavTab>
                </div>
            )}
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
