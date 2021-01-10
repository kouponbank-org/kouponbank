import "./discover-page.scss";

import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Business, NaverMapBound } from "../../api/kb-types";
import { getBusiness } from "../../store/business/business-reducer";
import { getAllBusinessWithinNaverMapBounds } from "../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext } from "../base-page-router";
import { MapR } from "../discover-page/naver-map/map";
import { KouponBankSideTabBarR } from "../common-components/navigation/navigation-side-tab-bar";
import { TopNavBar } from "../common-components/navigation/navigation-top-bar";
import { DiscoverBusinessList } from "../discover-page/discover-list-business";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    business: Business;
    businesses: Business[];
    naverMapBound: NaverMapBound;
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
    getBusiness: (api: KouponBankApi, business_id: string) => Promise<Business>;
}

export const DiscoverPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [mapBoundaries, setMapBoundaries] = useState({
        width: "841px",
        height: `${window.innerHeight * 0.948}px`,
    });
    // TODO: change map height as the window changes

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
    }, [props.naverMapBound]);

    // FOR: DiscoverBusinessList
    // If the user clicks on the business image, it will direct them to the business page
    const directToBusinessPage = (business_id) => {
        props
            .getBusiness(api, business_id)
            .then((business) => {
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    return (
        <div id="kb-discover-page">
            <KouponBankSideTabBarR />
            <div id="kb-discover-page-container">
                <TopNavBar />
                <div id="discover-page-main-container">
                    <div id="business-list-margin-control-container">
                        <div id="business-list-main-container">
                            <div id="business-list-padding-control-container">
                                <div id="business-list-container">
                                    {businesses.map((business) => {
                                        return (
                                            <DiscoverBusinessList
                                                directToBusinessPage={directToBusinessPage}
                                                key={business.id}
                                                business={business}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <MapR mapBoundaries={mapBoundaries} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
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
        getBusiness: async (api: KouponBankApi, business_id: string) => {
            return getBusiness(api, business_id, dispatch);
        },
    };
};

export const DiscoverPageR = connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
