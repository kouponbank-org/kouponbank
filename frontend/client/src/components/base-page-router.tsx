// React Components
import React, { useLayoutEffect, useState }from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

// Koupon Bank Frontend Components
import { HomePageR } from "./homepage/home-page";
import { LoginPageR } from "./login/login-page";
import { UserSignUpPageR } from "./signup/user-sign-up-page";

// API Components
import { KouponBankApi } from "../api/kb-api";

// Material UI Components

/**
 * Import files should be aligned in the following order
 * React Components
 * Koupon Bank Frontend Components
 * API Components
 * Material UI Components
 */

/**
 * Represents the required properties of the BasePageRouter.
 */
interface Prop {
    
}

export const ApiContext = React.createContext(null);

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
    }, [])

    if (!showPage) {
        return <div></div>
    }

    return (
        // any child can access the api
        // provider is saying anyone can access this thing
        // value = setting the thing people can access
        <ApiContext.Provider value={api}>
            <Switch>
                <Route path="/newuser" component = {UserSignUpPageR} />
                <Route path="/login" component={LoginPageR} />
                <Route exact path="/" component={HomePageR} />
            </Switch>
        </ApiContext.Provider>
    )
}

/**
 * Used to connect the state of the overall front end to the BasePageRouter.
 *
 * @param {Object} state The current state of the BasePageRouter.
 */

const mapStateToProps = state => {
    return {

    }
}

export const BasePageRouterR = connect(mapStateToProps)(BasePageRouter);