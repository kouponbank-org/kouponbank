import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { KouponBankApi } from "../api/kb-api";
import { Business } from "../api/kb-types";
import { BusinessPageR } from "./business/business-page";
import { CreateBusinessPageR } from "./business/create-business/create-business-page";
import { CreateCouponPageR } from "./coupon/create-coupon-page";
import { HomePageR } from "./homepage/home-page";
import { InfoPageR } from "./info/information-page";
import { LoginPageR } from "./login/login-page";
import { OwnerProfilePageR } from "./profile/owner-profile-page";
import { UserProfilePageR } from "./profile/user-profile-page";
import { SignUpPageR } from "./signup/sign-up-page";

export const ApiContext = React.createContext(null);

export enum UrlPaths {
    Home = "/",
    Login = "/kblogin",
    SignUpPage = "/kbsignup",
    UserProfile = "/uprofile",
    OwnerProfile = "/oprofile",
    CreateBusiness = "/newbusiness",
    BusinessPage = "/business/",
    CreateCoupon = "/newcoupon",
    InfoPage = "/info",
}

/**
 * Routes the App to the BasePage.
 *
 * @param {Object} props An object representing the require properties of
 *                 the BasePage. Contains nothing.
 * @returns {JSX.Element} The JSX representing the BasePage.
 */
const BasePageRouter = () => {
    const [api, setApi] = useState(null as KouponBankApi);
    const [showPage, setShowPage] = useState(false);
    /*
    window.onbeforeunload = function() {
        localStorage.clear();
    }
    */
    useLayoutEffect(() => {
        const kouponBankApi = new KouponBankApi();

        setApi(kouponBankApi);

        setTimeout(() => {
            setShowPage(true);
        }, 0);
    }, []);

    if (!showPage) {
        return <div></div>;
    }

    return (
        // any child can access the api
        // provider is saying anyone can access this thing
        // value = setting the thing people can access
        <ApiContext.Provider value={api}>
            <Switch>
                <Route path={UrlPaths.InfoPage} component={InfoPageR} />
                <Route path={UrlPaths.CreateCoupon} component={CreateCouponPageR} />
                <Route path={UrlPaths.BusinessPage} component={BusinessPageR} />
                <Route path={UrlPaths.CreateBusiness} component={CreateBusinessPageR} />
                <Route path={UrlPaths.UserProfile} component={UserProfilePageR} />
                <Route path={UrlPaths.OwnerProfile} component={OwnerProfilePageR} />
                <Route path={UrlPaths.SignUpPage} component={SignUpPageR} />
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
/*
const mapStateToProps = state => {
    return {

    };
};*/

export const BasePageRouterR = connect(null)(BasePageRouter);
