import "./profile-page.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { User, UserDetail } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { updateUserDetail } from "../../store/user/user-reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBar } from "../common-components/navigation/navigation-top-bar";
import { UserProfileForm } from "./profile-form";

/**
 * Represents the required properties of the User Profile Page
 */
export interface Prop {
    user: User;
    updateUserDetail: (api: KouponBankApi, userId: string, userDetail: UserDetail) => Promise<void>;
}

export const UserProfilePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userDetail, setUserDetail] = useState(props.user.user_detail);

    const editDetailInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserDetail({
            ...userDetail,
            [event.target.name]: event.target.value,
        });
    };

    const updateUserDetailClick = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .updateUserDetail(api, props.user.id, userDetail)
            .then(() => {
                history.push(UrlPaths.ProfilePage);
                // TODO: useEffect to refresh the page with changes, rather than using 
                // A history.push
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
            setUserDetail({
                ...userDetail,
                [target.name]: target.files[0],
            });
        }
    };

    return (
        <div className="background">
            <TopNavBar />
            <UserProfileForm
                user={props.user}
                userDetail={userDetail}
                editDetailInput={editDetailInput}
                uploadImage={uploadImage}
                updateUserDetailClick={updateUserDetailClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateUserDetail: async (api: KouponBankApi, userId: string, userDetail: UserDetail) => {
            return updateUserDetail(api, userId, userDetail, dispatch);
        },
    };
};

export const UserProfilePageR = connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
