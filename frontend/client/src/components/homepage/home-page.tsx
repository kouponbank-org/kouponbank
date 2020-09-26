import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import { NaverMapMarker } from "../naver-map/naver-map";
import { NavBarR } from "../navigation/navigation-bar";
import "./homepage.scss";


/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    resetUser: () => void;
    user: User;
};

export const HomePage = (props: Prop) => {
    const history = useHistory();

    const directToUserLogin = (event): void => {
        history.push(UrlPaths.UserLogin)
    }

    return (
        <div>
            <NavBarR
                title={"쿠폰뱅크"}
                buttonName={"로그인"}
                onClick={directToUserLogin}
            />
            <NaverMapMarker />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        user: state.userReducer.user
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}

export const HomePageR = connect(mapStateToProps, null)(HomePage);