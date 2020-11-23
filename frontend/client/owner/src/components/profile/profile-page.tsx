import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Owner, OwnerDetail } from "../../api/kb-types";
import { updateOwnerDetail } from "../../store/owner/owner-detail-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { NavBarR } from "../navigation/navigation-bar";
import { ProfileForm } from "./profile-form";
import "./profile-page.scss";

/**
 * Represents the required properties of the Owner Profile Page
 */
export interface Prop {
    ownerDetail: OwnerDetail;
    owner: Owner;
    updateOwnerDetail: (api: KouponBankApi, id: string, ownerDetail: OwnerDetail) => Promise<void>;
}

export const OwnerProfilePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [userDetailCredentials, setUserDetailCredentials] = useState(props.ownerDetail);

    const editDetails = (event: React.ChangeEvent<HTMLInputElement>): void => {        
        setUserDetailCredentials({
            ...userDetailCredentials,
            [event.target.name]: event.target.value,
        });
    };

    const submitChange = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .updateOwnerDetail(api, props.owner.id, userDetailCredentials)
            .then(() => {
                history.push(UrlPaths.ProfilePage);
            })
            .catch(() => {
                // currently does nothing;
            });
        event.preventDefault();
    };

    return (
        <div className="background">
            <NavBarR/>
            <ProfileForm 
                temp={userDetailCredentials}
                userCredentials={props.owner}
                userDetailCredentials={props.ownerDetail}
                editDetails={editDetails}
                submitChange={submitChange}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        owner: state.ownerReducer.owner,
        ownerDetail: state.ownerDetailReducer.ownerDetail,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateOwnerDetail: async (api: KouponBankApi, id: string, ownerDetail: OwnerDetail) => {
            return updateOwnerDetail(api, id, ownerDetail, dispatch);
        },
    };
};

export const OwnerProfilePageR = connect(mapStateToProps, mapDispatchToProps)(OwnerProfilePage);
