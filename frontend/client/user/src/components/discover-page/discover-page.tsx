import "./discover-page.scss";

import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Business, NaverMapBound, User } from "../../api/kb-types";
import { getBusiness } from "../../store/business/business-reducer";
import { getAllBusinessWithinNaverMapBounds } from "../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../store/reducer";
import { NavBar } from "../common-components/navigation/navigation-bar";
import { KouponBankSideTabBarR } from "../common-components/navigation/navigation-side-tab-bar";
import { DiscoverPageForm } from "./discover-page-form";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    businesses: Business[];
    user: User;
    naverMapBound: NaverMapBound;
    searchedBusiness: Business[];
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const DiscoverPage: React.FC<Prop> = (props: Prop) => {
    //TODO: For now, I set it to be conditional
    // the map searching feature of discover page and searching from the homepage.
    // it should be combined together.

    return (
        <div id="kb-discover-page">
            <div id="kb-discover-page-top-nav-main-contents-container">
                <NavBar user={props.user} />
                <main id="kb-discover-page-main-contents-margin-control-container">
                    <DiscoverPageForm
                        naverMapBound={props.naverMapBound}
                        searchedBusiness={props.searchedBusiness}
                        getBusiness={props.getBusiness}
                    />
                </main>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
        naverMapBound: state.naverMapReducer.naverMapBound,
        searchedBusiness: state.businessReducer.searchedBusinesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getAllBusinessWithinNaverMapBounds: async (
            api: KouponBankApi,
            naverMapBound: NaverMapBound,
        ) => {
            return getAllBusinessWithinNaverMapBounds(api, naverMapBound, dispatch);
        },
        getBusiness: async (api: KouponBankApi, businessId: string) => {
            return getBusiness(api, businessId, dispatch);
        },
    };
};

export const DiscoverPageR = connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
