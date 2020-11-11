import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { updateOwnerDetail } from "../../store/user/user-detail-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { UserProfileForm } from "./user-profile-form";
import "./user-profile-page.scss";

/**
 * Represents the required properties of the User Profile Page
 */
export interface Prop {
    userDetail: UserDetail;
    user: User;
    updateOwnerDetail: (api: KouponBankApi, id: string, userDetail: UserDetail) => Promise<void>;
}

export const OwnerProfilePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userDetailCredentials, setUserDetailCredentials] = useState(props.userDetail);

    const editDetails = (event: React.ChangeEvent<HTMLInputElement>): void => {        
        setUserDetailCredentials({
            ...userDetailCredentials,
            [event.target.name]: event.target.value,
        });
    };

    const submitChange = (event: React.MouseEvent<HTMLElement>): void => {
        console.log(userDetailCredentials);
        props
            .updateOwnerDetail(api, props.user.id, userDetailCredentials)
            .then(() => {
                history.push(UrlPaths.UserProfile);
            })
            .catch(() => {
                // currently does nothing;
            });
        event.preventDefault();
    };

    return (
        <div className="background">
            <NavBarR />
            <UserProfileForm
                userCredentials={props.user}
                userDetailCredentials={userDetailCredentials}
                editDetails={editDetails}
                submitChange={submitChange}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        userDetail: state.userDetailReducer.userDetail,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateOwnerDetail: async (api: KouponBankApi, id: string, userDetail: UserDetail) => {
            return updateOwnerDetail(api, id, userDetail, dispatch);
        },
    };
};

export const OwnerProfilePageR = connect(mapStateToProps, mapDispatchToProps)(OwnerProfilePage);
