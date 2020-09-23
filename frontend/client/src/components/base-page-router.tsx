import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { KouponBankApi } from "../api/kb-api";
import { HomePageR } from "./homepage/home-page";
import { LoginPageR } from "./login/login-page";
import { OwnerSignUpPageR } from "./login/signup/owner/owner-sign-up-page";
import { UserSignUpPageR } from "./login/signup/user/sign-up-page";
import { UserProfilePageR } from "./profile/user-profile-page";

/**
 * Represents the required properties of the BasePageRouter.
 */
interface Prop {
    
};

export const ApiContext = React.createContext(null);

export enum UrlPaths {
    Home = "/",
    Login = "/login",
    UserSignUp = "/usu",
    OwnerSignUp = "/osu",
    UserProfile = "profile"
}

/**
 * Routes the App to the BasePage.
 *
 * @param {Object} props An object representing the require properties of
 *                 the BasePage. Contains nothing.
 * @returns {JSX.Element} The JSX representing the BasePage.
 */
const BasePageRouter = (props: Prop) => {
    const [api, setApi] = useState(null as KouponBankApi);
    const [showPage, setShowPage] = useState(false);

    useLayoutEffect(() => {
        const kouponBankApi = new KouponBankApi();

        setApi(kouponBankApi);

        setTimeout(() => {
            setShowPage(true);
        }, 0);
    }, []);

    if (!showPage) {
        return <div></div>
    };

    return (
        // any child can access the api
        // provider is saying anyone can access this thing
        // value = setting the thing people can access
        <ApiContext.Provider value={api}>
            <Switch>
                <Route path={UrlPaths.UserProfile} component = {UserProfilePageR} />
                <Route path={UrlPaths.OwnerSignUp} component = {OwnerSignUpPageR} />
                <Route path={UrlPaths.UserSignUp} component = {UserSignUpPageR} />
                <Route path={UrlPaths.Login} component={LoginPageR} />
                <Route exact path={UrlPaths.Home} component={HomePageR} />
            </Switch>
        </ApiContext.Provider>
    );
};

/**
 * Used to connect the state of the overall front end to the BasePageRouter.
 *
 * @param {Object} state The current state of the BasePageRouter.
 */

const mapStateToProps = state => {
    return {

    };
};

export const BasePageRouterR = connect(mapStateToProps)(BasePageRouter);