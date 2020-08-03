import React, { useLayoutEffect, useState }from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { KouponBankApi } from "../api/kb-api";

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
            <div>
                <p>Hello</p>
            </div>
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