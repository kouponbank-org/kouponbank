import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Coupon, Owner } from "../../api/kb-types";
import { updateBusiness } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { BusinesspageForm } from "./business-page-form";
import "./business-page.scss";

export interface Prop {
    business: Business;
    owner: Owner;
    coupon: Coupon;
    updateBusiness: (
        api: KouponBankApi,
        userId: string,
        businessId: string,
        business: Business,
    ) => Promise<void>;
}

export const BusinessPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businessInfo, setBusinessInfo] = useState(props.business);

    const editDetails = (event): void => {
        setBusinessInfo({
            ...businessInfo,
            [event.target.name]: event.target.value,
        });
    };

    const submitChange = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .updateBusiness(api, props.owner.id, props.business.id, businessInfo)
            .then(() => {
                history.push(UrlPaths.BusinessListPage);
            })
            .catch(() => {
                // currently does nothing
            });
        event.preventDefault();
    };

    const uploadImage = (event) => {
        const target = event.target;
        if (target.files[0].size > 2097152) {
            alert("File is too big!");
        } else {
            setBusinessInfo({
                ...businessInfo,
                [target.name]: target.files[0],
            });
        }
    };

    return (
        <div className="business-page">
            <TopNavBarR />
            <BusinesspageForm
                businessInput={businessInfo}
                business={props.business}
                editDetails={editDetails}
                uploadImage={uploadImage}
                submitChange={submitChange}
                coupon={props.coupon}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        owner: state.ownerReducer.owner,
        business: state.businessReducer.business,
        coupon: state.couponReducer.coupon,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateBusiness: async (
            api: KouponBankApi,
            userId: string,
            businessId: string,
            business: Business,
        ) => {
            return updateBusiness(api, userId, businessId, business, dispatch);
        },
    };
};

export const BusinessPageR = connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
