import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { UpdateUserDetail } from "../../store/user/user-detail-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { UserProfileForm } from "./user-profile-form";
import './user-profile-page.scss';


/**
 * Represents the required properties of the User Profile Page
 */
export interface Prop {
    userDetail: UserDetail; 
    user: User;
    UpdateUserDetail: (
        api: KouponBankApi,
        id: string,
        userDetail: UserDetail,
    ) => Promise<void>;
};

export const UserProfilePage = (props: Prop) =>  {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userDetailCredentials, setUserDetailCredentials] = useState(props.userDetail);
    const editDetails = (event): void => {
        setUserDetailCredentials({
            ...userDetailCredentials,
            [event.target.name]: event.target.value
        });
    };

    const submitChange = (event): void => {
        props.UpdateUserDetail(api,
                               props.user.id,
                               userDetailCredentials
                               ).then(() => {
            history.push(UrlPaths.UserProfile);
        });
        event.preventDefault();
    };

    return (
        <div className="background">
            <NavBarR/>
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
        UpdateUserDetail: (
            api: KouponBankApi,
            id: string,
            userDetail: UserDetail,
        ) => {
            return UpdateUserDetail(api, id, userDetail, dispatch)
        }    
    };

};

export const UserProfilePageR = connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);