import "./navigation-bar.scss";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../../../api/kb-types";
import { UrlPaths } from "../../base-page-router";

export interface Prop {
    user?: User;
}

export const NavBar: React.FC<Prop> = (props: Prop) => {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(Boolean);
    const directToHomePage = () => {
        history.push(UrlPaths.HomePage);
    };

    const directToDiscoverPage = () => {
        history.push(UrlPaths.DiscoverPage);
    };

    const directToReservationPage = () => {};

    const directToProfilePage = () => {
        history.push(UrlPaths.ProfilePage);
    };

    //For the pages not loading user info, show login button
    //Else IF user logged in, show the direction buttons
    useEffect(() => {
        if (props.user == undefined) setLoggedIn(false);
        else if (props.user.id != "") setLoggedIn(true);
        else setLoggedIn(false);
    }, []);

    return (
        <div id="nav-bar">
            <main id="nav-bar-container">
                <div id="nav-bar-container-column1">
                    <img src="Logo.png" alt="logo" id="logo" onClick={directToHomePage} />
                </div>
                {loggedIn ? (
                    <div id="nav-bar-container-column2">
                        <button id="nav-bar-container-column2-column1" onClick={directToHomePage}>
                            Home
                        </button>
                        <button
                            id="nav-bar-container-column2-column2"
                            onClick={directToDiscoverPage}
                        >
                            Discover
                        </button>
                        <button
                            id="nav-bar-container-column2-column3"
                            onClick={directToReservationPage}
                        >
                            Reservation
                        </button>
                        <button
                            id="nav-bar-container-column2-column4"
                            onClick={directToProfilePage}
                        >
                            My Profile
                        </button>
                    </div>
                ) : (
                    <div id="nav-bar-container-logged-in">
                        <button id="nav-bar-container-logged-in-button"> Log In </button>
                    </div>
                )}
            </main>
        </div>
    );
};
