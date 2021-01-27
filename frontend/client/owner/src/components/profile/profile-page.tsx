import "./profile-page.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Owner, OwnerDetail } from "../../api/kb-types";
import { updateOwnerDetail } from "../../store/owner/owner-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { ProfileForm } from "./profile-form";

/**
 * Represents the required properties of the Owner Profile Page
 */
export interface Prop {
    owner: Owner;
    updateOwnerDetail: (api: KouponBankApi, ownerId: string, ownerDetail: OwnerDetail) => Promise<void>;
}

export const ProfilePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [ownerDetail, setOwnerDetail] = useState(props.owner.owner_detail);

    const editDetails = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setOwnerDetail({
            ...ownerDetail,
            [event.target.name]: event.target.value,
        });
    };

    const submitChange = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .updateOwnerDetail(api, props.owner.id, ownerDetail)
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
            <TopNavBarR />
            <ProfileForm
                owner={props.owner}
                ownerDetail={ownerDetail}
                editDetails={editDetails}
                submitChange={submitChange}
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
        updateOwnerDetail: async (api: KouponBankApi, ownerId: string, ownerDetail: OwnerDetail) => {
            return updateOwnerDetail(api, ownerId, ownerDetail, dispatch);
        },
    };
};

export const ProfilePageR = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
