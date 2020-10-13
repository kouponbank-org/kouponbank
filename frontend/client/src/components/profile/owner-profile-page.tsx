import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { UpdateOwnerDetail } from "../../store/user/user-detail-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { RootReducer } from "../../store/reducer";
import { Dispatch } from "redux";
import { UserProfileForm } from "./user-profile-form";
import { NavBarR } from "../navigation/navigation-bar";
import './user-profile-page.scss';

/**
 * Represents the required properties of the User Profile Page
 */
export interface Prop {
    userDetail: UserDetail; 
    user: User;
    UpdateOwnerDetail: (
        api: KouponBankApi,
        id: string,
        name: string,
        gender: string,
        birthday: string,
        location: string | number,
        profile_picture: null,
    ) => Promise<void>;
};

export const OwnerProfilePage = (props: Prop) =>  {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userCredentials, setUserCredentials] = useState(props.user);
    const [userInfo, setUserInfo] = useState({
        name: "",
        gender: "",
        birthday: "",
        location: "",
        profile_picture: null});
    
    const editDetails = (event): void => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    };

    const submitChange = (event): void => {
        props.UpdateOwnerDetail(api,
                               userCredentials.id,
                               userInfo.name,
                               userInfo.gender,
                               userInfo.birthday, 
                               userInfo.location,
                               userInfo.profile_picture
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
                userDetailCredentials={props.userDetail}
                editDetails={editDetails}
                submitChange={submitChange}
                updatedInfo={userInfo}
            />
        </div>
    );
};

  const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        user: state.userReducer.user,
        userDetail: state.userDetailReducer.userDetail,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        UpdateOwnerDetail: (
            api: KouponBankApi,
            id: string,
            name: string,
            gender: string,
            birthday: string,
            location: string | number,
            profile_picture: null,
        ) => {
            return UpdateOwnerDetail(api, id, name, gender, birthday, location, profile_picture, dispatch)
        }    
    };

};

export const OwnerProfilePageR = connect(mapStateToProps, mapDispatchToProps)(OwnerProfilePage);