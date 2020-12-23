import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, Coupon, NaverMapBound, User } from "../../api/kb-types";
import { getAllBusinessWithinNaverMapBounds } from "../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext } from "../base-page-router";
import { BottomNavBar } from "../navigation/navigation-bottom-bar";
import { TopNavBarR } from "../navigation/navigation-top-bar";
import { DiscoverBusinessList } from "./discover-list-business";
import "./discover-page.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    coupon: Coupon;
    business: Business;
    businesses: Business[];
    naverMapBound: NaverMapBound;
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
}

export const DiscoverListPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const [businesses, setBusinesses] = useState<Business[]>([]);

    // FOR: Discover Near Me button.
    // When you go into the DiscoverListPage from the map
    // it will use the map bounds to get the list of business within the bounds
    // from the database.
    useEffect(() => {
        props
            .getAllBusinessWithinNaverMapBounds(api, props.naverMapBound)
            .then((businesses) => {
                setBusinesses(businesses);
            })
            .catch(() => {
                // Currently does nothing
            });
    }, []);

    return (
        <div className="discover-list-page">
            <TopNavBarR title={"Discover Cafe"} />
            <div className="discover-list-page business-list">
                {businesses.map((business) => {
                    return <DiscoverBusinessList key={business.id} business={business} />
                })}
            </div>
            <BottomNavBar />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
        naverMapBound: state.naverMapReducer.naverMapBound,
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
    };
};

export const DiscoverListPageR = connect(mapStateToProps, mapDispatchToProps)(DiscoverListPage);
