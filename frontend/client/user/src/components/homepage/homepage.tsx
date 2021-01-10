import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { Business, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { KouponBankApi } from "../../api/kb-api";
import { ApiContext } from "../base-page-router";
import { getBusiness, getBusinesses } from "../../store/business/business-reducer";
import { KouponBankSideTabBarR } from "../common-components/navigation/navigation-side-tab-bar";
import { TopNavBar } from "../common-components/navigation/navigation-top-bar";
import { HomepageForm } from "./homepage-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    coupon: Coupon;
    business: Business;
    businesses: Business[];
    getBusinesses: (api: KouponBankApi) => Promise<Business[]>;
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const HomePage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const history = useHistory();

    // FOR: Redirect to individual business page
    // When you click the business, it will redirect to clicked business page
    const selectBusiness = (businessId) => {
        props
            .getBusiness(api, businessId)
            .then((business) => {
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    // TODO: Remove get buisinesses request from login/signup page
    // Add condition for recommendation [props.user.id] -> will update for different user,
    // Need to set the argorithm of user info being updated as the user moves or sets some other preferneces and more.

    // FOR: List of businesses
    // When you load the homepage, it shows the list of businesses.
    useEffect(() => {
        props
            .getBusinesses(api)
            .then((businesses) => {
                setBusinesses(businesses);
            })
            .catch(() => {
                // Currently does nothing
            });
    }, [props.user.id]);

    return (
        <div id="background-home">
            <KouponBankSideTabBarR />
            <div id="homepage-container">
                <TopNavBar />
                <HomepageForm businesses={businesses} selectBusiness={selectBusiness} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getBusiness: async (api: KouponBankApi, businessId: string) => {
            return getBusiness(api, businessId, dispatch);
        },
        getBusinesses: async (api: KouponBankApi) => {
            return getBusinesses(api, dispatch);
        },
    };
};

export const HomePageR = connect(mapStateToProps, mapDispatchToProps)(HomePage);
