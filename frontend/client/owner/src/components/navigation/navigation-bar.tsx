import { AppBar, Button, Toolbar } from "@material-ui/core";
import React, { Fragment, ReactElement } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { Owner, OwnerDetail } from "../../api/kb-types";
import { RootReducer, signOut } from "../../store/reducer";
import { UrlPaths } from "../base-page-router";
import "./navigation-bar.scss";

export interface Prop {
    owner?: Owner;
    ownerDetail?: OwnerDetail;
    title?: string;
    buttonName?: string;
    onClick?: (event) => void;
    signOut?: () => void;
}

export const NavBar = (props: Prop): ReactElement => {
    const history = useHistory();

    const redirectToHomepage = (event: React.MouseEvent<HTMLElement>): void => {
        history.push(UrlPaths.HomePage);
        event.preventDefault();
    };

    const signOut = () => {
        props.signOut();
        history.push(UrlPaths.HomePage);
    };

    const redirectToBusinesses = () => {
        history.push(UrlPaths.BusinessListPage)
    }

    const redirectToProfilePage = () => {
        history.push(UrlPaths.ProfilePage);
    };

    return (
        <div className="nav-bar">
            <AppBar>
                <Toolbar>
                    <Button className="homepage button" onClick={redirectToHomepage}>
                        Koupon Bank
                    </Button>
                    {props.title}
                    {props.owner.username !== "" ? (
                        <Fragment>
                            <Button className="profile-details" onClick={redirectToProfilePage}>
                                My Profile
                            </Button>
                            <Button className="logout" onClick={signOut}>
                                Sign Out
                            </Button>
                            <Button className="business-button" onClick={redirectToBusinesses}>
                                My Businesses
                            </Button>
                        </Fragment>
                    ) : (
                        <Button onClick={props.onClick}>{props.buttonName}</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        owner: state.ownerReducer.owner,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        signOut: () => {
            return signOut(dispatch);
        },
    };
};

export const TopNavBarR = connect(mapStateToProps, mapDispatchToProps)(NavBar);
