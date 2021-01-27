import "./homepage.scss";

import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { RootReducer } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { HomepageForm } from "./homepage-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {

}

export const HomePage: React.FC<Prop> = (props: Prop) => {
    const history = useHistory();

    const directToUserLogin = (): void => {
        history.push(UrlPaths.LoginPage);
    };

    return (
        <div>
            <TopNavBarR title={"Koupon Bank"} buttonName={"Login"} onClick={directToUserLogin} />
            <HomepageForm />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    };
};

export const HomePageR = connect(mapStateToProps, mapDispatchToProps)(HomePage);
