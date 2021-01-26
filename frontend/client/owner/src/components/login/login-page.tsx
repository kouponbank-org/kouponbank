import "./login.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Owner } from "../../api/kb-types";
import { loginOwner } from "../../store/owner/owner-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { LoginForm } from "./login-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    loginOwner: (api: KouponBankApi, owner: Owner) => Promise<void>;
    owner: Owner;
}

export const LoginPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [owner, setOwner] = useState(props.owner);

    const ownerLoginInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setOwner({
            ...owner,
            [target.name]: target.value,
        });
    };

    const loginOwnerClick = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .loginOwner(api, owner)
            .then(() => {
                history.push(UrlPaths.HomePage);
            })
            .catch(() => {
                // Currently does nothing
            });
        event.preventDefault();
    };

    const directToSignUpPageClick = (): void => {
        history.push(UrlPaths.SignUpPage);
    };

    return (
        <div className="background">
            <TopNavBarR title={"Business Owner Login Page"} />
            <LoginForm
                directToSignUpPageClick={directToSignUpPageClick}
                owner={owner}
                ownerLoginInput={ownerLoginInput}
                loginOwnerClick={loginOwnerClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        owner: state.ownerReducer.owner,
        business: state.businessReducer.businesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginOwner: async (api: KouponBankApi, owner: Owner) => {
            return loginOwner(api, owner, dispatch);
        },
    };
};

export const LoginPageR = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
