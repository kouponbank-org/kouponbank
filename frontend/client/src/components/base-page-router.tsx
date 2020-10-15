import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { KouponBankApi } from "../api/kb-api";
import { CreateBusinessPageR } from "./business/create-business-page";
import { HomePageR } from "./homepage/home-page";
import { OwnerLoginPageR } from "./login/owner-login-page";
import { OwnerSignUpPageR } from "./login/signup/owner/owner-sign-up-page";
import { UserSignUpPageR } from "./login/signup/user/user-sign-up-page";
import { UserLoginPageR } from "./login/user-login-page";
import { UserProfilePageR } from "./profile/user-profile-page";
import { OwnerProfilePageR } from "./profile/owner-profile-page";
import { CreateCouponPageR } from "./coupon/create-coupon-page";

/**
 * Represents the required properties of the BasePageRouter.
 */
interface Prop {
    
};

export const ApiContext = React.createContext(null);

export enum UrlPaths {
    Home = "/",
    UserLogin = "/ulogin",
    OwnerLogin = "/ologin",
    UserSignUp = "/usu",
    OwnerSignUp = "/osu",
    UserProfile = "/uprofile",
    OwnerProfile = "/oprofile",
    CreateBusiness = "/newbusiness",
    ViewBusiness = "/business",
    CreateCoupon = "/newcoupon",
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
        return <div></div>
    };

    return (
        // any child can access the api
        // provider is saying anyone can access this thing
        // value = setting the thing people can access
        <ApiContext.Provider value={api}>
            <Switch>
                <Route path={UrlPaths.CreateCoupon} component={CreateCouponPageR} />
                <Route path={UrlPaths.CreateBusiness} component={CreateBusinessPageR} />
                <Route path={UrlPaths.UserProfile} component={UserProfilePageR} />
                <Route path={UrlPaths.OwnerProfile} component={OwnerProfilePageR} />
                <Route path={UrlPaths.OwnerSignUp} component={OwnerSignUpPageR} />
                <Route path={UrlPaths.UserSignUp} component={UserSignUpPageR} />
                <Route path={UrlPaths.OwnerLogin} component={OwnerLoginPageR} />
                <Route path={UrlPaths.UserLogin} component={UserLoginPageR} />
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