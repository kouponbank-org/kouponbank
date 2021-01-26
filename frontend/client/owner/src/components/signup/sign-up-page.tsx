import "./sign-up-page.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Owner, OwnerDetail } from "../../api/kb-types";
import { createNewOwner } from "../../store/owner/owner-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { SignUpForm } from "./sign-up-form";

// TODO: FIX SIGNUP PAGE AND SIGNUP FORM
/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createNewOwner: (api: KouponBankApi, owner: Owner, ownerDetail: OwnerDetail) => Promise<void>;
    owner: Owner;
}

export const SignUpPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [owner, setOwner] = useState(props.owner);
    const [ownerDetail, setOwnerDetail] = useState(props.owner.owner_detail);

    const createNewOwnerClick = (event: React.FormEvent): void => {
        props
            .createNewOwner(api, owner, ownerDetail)
            .then(() => {
                history.push(UrlPaths.HomePage);
            })
            .catch(() => {
                //currently does nothing
            });
        event.preventDefault();
    };

    const ownerSignUpInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setOwner({
            ...owner,
            [target.name]: target.value,
        });
    };

    const ownerDetailSignUpInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setOwnerDetail({
            ...ownerDetail,
            [target.name]: target.value,
        });
    };

    return (
        <div>
            <TopNavBarR />
            <SignUpForm
                createNewOwnerClick={createNewOwnerClick}
                ownerDetailSignUpInput={ownerDetailSignUpInput}
                ownerSignUpInput={ownerSignUpInput}
            />
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
        createNewOwner: async (api: KouponBankApi, owner: Owner, ownerDetail: OwnerDetail) => {
            return createNewOwner(api, owner, ownerDetail, dispatch);
        },
    };
};

export const SignUpPageR = connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
