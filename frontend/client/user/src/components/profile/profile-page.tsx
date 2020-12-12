import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { updateUserDetail } from "../../store/user/user-detail-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { UserProfileForm } from "./profile-form";
import "./profile-page.scss";

/**
 * Represents the required properties of the User Profile Page
 */
export interface Prop {
    userDetail: UserDetail;
    user: User;
    updateUserDetail: (api: KouponBankApi, id: string, userDetail: UserDetail) => Promise<void>;
}

export const UserProfilePage: React.FC<Prop> = (props: Prop) => {
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
        props
            .updateUserDetail(api, props.user.id, userDetailCredentials)
            .then(() => {
                history.push(UrlPaths.ProfilePage);
            })
            .catch(() => {
                // currently does nothing
            });
        event.preventDefault();
    };

    // TODO:
    // 1) Find a way to combine this method with editDetails method.
    // 2) Remove the target file value from upload bar if size is too big.
    const uploadImage = (event) => {
        const target = event.target;
        if (target.files[0].size > 2097152) {
            alert("File is too big!");
        } else {
            setUserDetailCredentials({
                ...userDetailCredentials,
                [target.name]: target.files[0],
            });
        }
    };

    return (
        <div className="background">
            <NavBarR />
            <UserProfileForm
                temp={userDetailCredentials}
                userCredentials={props.user}
                userDetailCredentials={props.userDetail}
                editDetails={editDetails}
                uploadImage={uploadImage}
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
        updateUserDetail: async (api: KouponBankApi, id: string, userDetail: UserDetail) => {
            return updateUserDetail(api, id, userDetail, dispatch);
        },
    };
};

export const UserProfilePageR = connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
