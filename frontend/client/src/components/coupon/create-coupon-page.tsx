import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Coupon, User } from "../../api/kb-types";
import { createCoupon } from "../../store/coupon/coupon-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { CreateCouponForm } from "./create-coupon-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    createCoupon: (
        api: KouponBankApi,
        userId: string,
        businessId: string,
        coupon: Coupon,
    ) => Promise<void>;
    user: User;
    business: Business;
    coupon: Coupon;
};

export const CreateCouponPage = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [coupon, setCoupon] = useState(props.coupon);

    // 쿠폰 정보
    const couponInformationInput = (event): void => {
        setCoupon({
            ...coupon,
            [event.target.name]: event.target.value
        });
    };

    /**
     * 쿠폰 추가하기 클릭
     * @param event 
     */
    const createCouponClick = (event): void => {
        props.createCoupon(
            api,
            props.user.id,
            props.business.id,
            coupon,
            ).then(() => {
                history.push(UrlPaths.Home);
            });
        event.preventDefault();
    };

    return (
        <div className="background">
            <CreateCouponForm 
                coupon={coupon}
                couponInformationInput={couponInformationInput}
                createCouponClick={createCouponClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
        coupon: state.couponReducer.coupon,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createCoupon: (
            api: KouponBankApi,
            userId: string,
            businessId: string,
            coupon: Coupon,
        ) => {
            return createCoupon(api, userId, businessId, coupon, dispatch);
        }
    };
};

export const CreateCouponPageR = connect(mapStateToProps, mapDispatchToProps)(CreateCouponPage);