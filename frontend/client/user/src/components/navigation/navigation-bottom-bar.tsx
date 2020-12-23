import React, { ReactElement } from "react";
import { UrlPaths } from "../base-page-router";
import { NavTab } from "react-router-tabs";
import "./navigation-bar.scss";

export const BottomNavBar = (): ReactElement => {
    //TODO:
    // 1) nav-tab button, show Image,
    // 2) media queries
    // 3) reorganize the top nav and bottom nav margins

    return (
        <div className="nav-tab">
            <NavTab className="nav-tab-content" exact to={UrlPaths.HomePage}>
                Home
            </NavTab>
            <NavTab className="nav-tab-content" exact to={UrlPaths.DiscoverPage}>
                Discover
            </NavTab>
            <NavTab className="nav-tab-content" exact to={UrlPaths.LoginPage}>
                Login
            </NavTab>
            <NavTab className="nav-tab-content" exact to={UrlPaths.SignUpPage}>
                Signup
            </NavTab>
            <NavTab className="nav-tab-content" to={UrlPaths.ProfilePage}>
                Profile
            </NavTab>
        </div>
    );
};
